import { prisma } from "$/plugins/prisma"
import { api } from "$/routes/api/_api"
import type { Locals } from "$/routes/api/_types"
import { string } from "$modules/cute-struct/src/cute-struct/fields/string"
import { many } from "$modules/cute-struct/src/cute-struct/many"
import { struct } from "$modules/cute-struct/src/cute-struct/struct"
import type { RequestHandler } from "@sveltejs/kit"

const resolveYtIdParams = struct({
    channelIds: many(string({})).asFieldLike({ optional: true }),
    videoIds: many(string({})).asFieldLike({ optional: true })
})

export const get: RequestHandler<{ channelIds?: string, videoIds?: string }, any> = async (event) =>
{
    return await api(async () =>
    {
        const params = resolveYtIdParams.verify({
            channelIds: event.url.searchParams.get('channelIds')?.split(','),
            videoIds: event.url.searchParams.get('videoIds')?.split(',')
        })

        return Object.assign(
            params.channelIds?.length > 0 ? {
                channels: await task({
                    ids: params.channelIds,
                    model: prisma.channel,
                    odyseeApi: {
                        responsePath: 'channels',
                        searchParam: 'channel_ids'
                    }
                })
            } : {},
            params.videoIds?.length > 0 ? {
                videos: await task({
                    ids: params.videoIds,
                    model: prisma.video,
                    odyseeApi: {
                        responsePath: 'videos',
                        searchParam: 'video_ids'
                    }
                })
            } : {}
        )
    })
}

async function task(params: {
    model: typeof prisma.channel | typeof prisma.video
    odyseeApi: {
        searchParam: 'channel_ids' | 'video_ids',
        responsePath: 'channels' | 'videos'
    },
    ids: string[]
})
{
    const odyseeApiUrl = new URL(`https://api.odysee.com/yt/resolve`)
    const cache = Object.fromEntries((await params.model.findMany({
        where: {
            OR: params.ids.map((id) => ({
                id: id
            }))
        }
    })).map((row) => [row.id, row.lbryUrl]))

    const needed = params.ids.filter((id) => !cache[id])

    if (needed.length > 0)
    {
        odyseeApiUrl.searchParams.set(params.odyseeApi.searchParam, needed.join(','))

        await (await fetch(odyseeApiUrl.href)).json().then(async (response) =>
        {
            const responseIds: Record<string, string> = response.data[params.odyseeApi.responsePath]
            await params.model.createMany({
                data: Object.entries(responseIds).map(([id, lbryUrl]) => ({
                    id,
                    lbryUrl,
                    scrapDate: Date.now()
                }))
            })
            Object.assign(cache, responseIds)
        })
    }

    return cache
}