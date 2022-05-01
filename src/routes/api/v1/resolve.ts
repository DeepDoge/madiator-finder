import { prisma } from "$/plugins/prisma"
import { apiRequest } from "$/routes/api/_api"
import { string } from "$modules/cute-struct/src/cute-struct/fields/string"
import { many } from "$modules/cute-struct/src/cute-struct/many"
import { struct } from "$modules/cute-struct/src/cute-struct/struct"
import type { Profile } from "@prisma/client"

const resolveYtIdParams = struct({
    channelIds: many(string({})).asFieldLike({ optional: true }),
    videoIds: many(string({})).asFieldLike({ optional: true }),
    keys: struct({
        publicKey: string({}),
        signature: string({}),
        data: string({})
    }).asFieldLike({ optional: true })
})

export const resolveYtRequest = apiRequest()
    (async ({ params, profile, event }) =>
    {
        const p = resolveYtIdParams.verify(Object.assign(
            {
                channelIds: (event.params['channel_ids'] || null)?.split(','),
                videoIds: (event.params['video_ids'] || null)?.split(','),
            },
            event.params.publicKey && event.params.signature ? {
                keys: {
                    publicKey: event.params.publicKey,
                    signature: event.params.signature,
                    data: event.url.searchParams.toString()
                }
            } : {}
        ))

        return {
            data: Object.assign(
                p.channelIds?.length > 0 ?
                    {
                        channels: await task({
                            ids: p.channelIds,
                            type: 'Channel',
                            odyseeApi: {
                                responsePath: 'channels',
                                searchParam: 'channel_ids'
                            },
                            keys: p.keys
                        }, profile)
                    } : {},
                p.videoIds?.length > 0 ?
                    {
                        videos: await task({
                            ids: p.videoIds,
                            type: 'Video',
                            odyseeApi: {
                                responsePath: 'videos',
                                searchParam: 'video_ids'
                            },
                            keys: p.keys
                        }, profile)
                    } : {}
            )
        } as { data: { channels?: Record<string, string>, videos?: Record<string, string> } }
    })
export const get = resolveYtRequest.requestHandler

async function task(params: {
    type: 'Video' | 'Channel'
    odyseeApi: {
        searchParam: 'channel_ids' | 'video_ids',
        responsePath: 'channels' | 'videos'
    },
    ids: string[],
    keys?: typeof resolveYtIdParams['TYPE']['keys']['TYPE']
}, profile: Profile)
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
            const responseIdEntries = Object.entries(response.data[params.odyseeApi.responsePath]).filter(([id, lbryUrl]) => lbryUrl) as [string, string][]

            const createManyData = responseIdEntries.map(([id, lbryUrl]) =>
            {
                const data: Parameters<typeof prisma.lbryUrlMap.createMany>['0']['data'] = {
                    id,
                    lbryUrl,
                    scrapDate: Date.now(),
                    type: params.type
                }
                return data
            })

            if (profile) await prisma.profile.update({
                data: {
                    score: profile.score + createManyData.length,
                    LbryUrlMap: {
                        createMany: {
                            data: createManyData
                        }
                    }
                },
                where: { publicKey: profile.publicKey }
            })
            else await prisma.lbryUrlMap.createMany({
                data: createManyData
            })

            Object.assign(cache, Object.fromEntries(responseIdEntries))
        })
    }

    return cache
}