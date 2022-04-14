import { prisma } from "$/plugins/prisma"
import { api } from "$/routes/api/_api"
import { string } from "$modules/cute-struct/src/cute-struct/fields/string"
import { many } from "$modules/cute-struct/src/cute-struct/many"
import { struct } from "$modules/cute-struct/src/cute-struct/struct"
import type { RequestHandler } from "@sveltejs/kit"
import crypto from 'crypto'

const resolveYtIdParams = struct({
    channelIds: many(string({})).asFieldLike({ optional: true }),
    videoIds: many(string({})).asFieldLike({ optional: true }),
    keys: struct({
        publicKey: string({}),
        signature: string({}),
        data: string({})
    }).asFieldLike({ optional: true })
})

export const get: RequestHandler<{ channelIds?: string, videoIds?: string, signature?: string, publicKey?: string }, any> = async (event) =>
{
    return await api(async () =>
    {
        const params = resolveYtIdParams.verify(Object.assign(
            {
                channelIds: event.params.channelIds?.split(','),
                videoIds: event.params.videoIds?.split(','),
            },
            event.params.publicKey && event.params.signature ? {
                keys: {
                    publicKey: event.params.publicKey,
                    signature: event.params.signature,
                    data: event.url.searchParams.toString()
                }
            } : {}
        ))

        return Object.assign(
            params.channelIds?.length > 0 ?
                {
                    channels: await task({
                        ids: params.channelIds,
                        type: 'Channel',
                        odyseeApi: {
                            responsePath: 'channels',
                            searchParam: 'channel_ids'
                        },
                        keys: params.keys
                    })
                } : {},
            params.videoIds?.length > 0 ?
                {
                    videos: await task({
                        ids: params.videoIds,
                        type: 'Video',
                        odyseeApi: {
                            responsePath: 'videos',
                            searchParam: 'video_ids'
                        },
                        keys: params.keys
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
    keys?: typeof resolveYtIdParams['TYPE']['keys']['TYPE']
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

            let publicKey = null
            if (params.keys && verifySignature(params.keys))
            {
                const profile = await prisma.profile.findUnique({ where: { publicKey } })
                if (!profile) await prisma.profile.create({ data: { publicKey } })
                publicKey = params.keys.publicKey
                await prisma.profile.update({
                    data: { score: profile.score + 1 },
                    where: { publicKey }
                })
            }

            await prisma.lbryUrlMap.createMany({
                data: Object.entries(responseIds).filter(([id, lbryUrl]) => lbryUrl).map(([id, lbryUrl]) =>
                {
                    const data: Parameters<typeof prisma.lbryUrlMap.createMany>['0']['data'] = {
                        id,
                        lbryUrl,
                        scrapDate: Date.now(),
                        profilePublicKey: publicKey,
                        type: params.type
                    }
                    return data
                })
            })
            Object.assign(cache, responseIds)
        })
    }

    return cache
}

async function verifySignature(keys: Parameters<typeof task>['0']['keys']): Promise<boolean>
{
    return crypto.verify(
        "sha256",
        Buffer.from(keys.data),
        {
            key: Buffer.from(keys.publicKey),
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        },
        Buffer.from(keys.signature)
    )
}