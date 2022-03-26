import { prisma } from "$/plugins/prisma"
import { api } from "$/routes/api/_api"
import { string } from "$modules/cute-struct/src/cute-struct/fields/string"
import { many } from "$modules/cute-struct/src/cute-struct/many"
import { struct } from "$modules/cute-struct/src/cute-struct/struct"
import type { RequestHandler } from "@sveltejs/kit"

const resolveYtIdParams = struct({
    channelIds: many(string({})).asFieldLike({ optional: true }),
    videoIds: many(string({})).asFieldLike({ optional: true }),
    signature: string({})
})

export const get: RequestHandler<{ channelIds?: string, videoIds?: string, signature: string }, any> = async (event) =>
{
    return await api(async () =>
    {
        const params = resolveYtIdParams.verify({
            channelIds: event.url.searchParams.get('channelIds')?.split(','),
            videoIds: event.url.searchParams.get('videoIds')?.split(','),
            signature: event.url.searchParams.get('signature')
        })

        return Object.assign(
            params.channelIds?.length > 0 ? {
                channels: await task({
                    ids: params.channelIds,
                    type: 'Channel',
                    odyseeApi: {
                        responsePath: 'channels',
                        searchParam: 'channel_ids'
                    },
                    signature: params.signature ?? null,
                    signatureData: event.url.searchParams.toString()
                })
            } : {},
            params.videoIds?.length > 0 ? {
                videos: await task({
                    ids: params.videoIds,
                    type: 'Video',
                    odyseeApi: {
                        responsePath: 'videos',
                        searchParam: 'video_ids'
                    },
                    signature: params.signature ?? null,
                    signatureData: event.url.searchParams.toString()
                })
            } : {}
        )
    })
}

async function task(params: {
    type: 'Video' | 'Channel'
    odyseeApi: {
        searchParam: 'channel_ids' | 'video_ids',
        responsePath: 'channels' | 'videos'
    },
    ids: string[],
    signatureData: string,
    signature: string
})
{
    const odyseeApiUrl = new URL(`https://api.odysee.com/yt/resolve`)
    const cache = Object.fromEntries((await prisma.lbryUrlMap.findMany({
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

            const publicKey = await verifySignatureAndGetPublicKey(params.signatureData, params.signature)

            await prisma.lbryUrlMap.createMany({
                data: Object.entries(responseIds).map(([id, lbryUrl]) => ({
                    id,
                    lbryUrl,
                    scrapDate: Date.now(),
                    profilePublicKey: publicKey,
                    type: params.type
                }))
            })
            Object.assign(cache, responseIds)
        })
    }

    return cache
}

async function verifySignatureAndGetPublicKey(data: string, signature: string): Promise<string>
{
    if (signature === null) return null
    return '123'
}