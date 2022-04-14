
  import { verify } from "$/plugins/common/crypto"
import { prisma } from "$/plugins/prisma"
import type { Profile } from "@prisma/client"
import type { RequestEvent, RequestHandlerOutput } from "@sveltejs/kit/types/internal"

export interface ApiRequest<Params extends Record<string ,any> = Record<string ,any>, Returns = any>
{
    TYPE: { IN: Params, OUT: Returns }
    serialize(data: Params): string
    deserialize(serialized: string): Params
    requestHandler(event: RequestEvent): RequestHandlerOutput
}

export function apiRequest<Params>(requireAuth = false)
{
    return <Returns>(resolver: (params: { params: Params, profile?: Profile, event: RequestEvent }) => Promise<Returns>) =>
    {
        const r: ApiRequest<Params, Returns> = {
            TYPE: null,
            serialize(data: Params)
            {
                return JSON.stringify(data)
            },
            deserialize(serialized: string)
            {
                return JSON.parse(serialized)
            },
            async requestHandler(event: RequestEvent)
            {
                if (event.params.keys)
                {
                    if (!verify(event.url.searchParams.toString(), event.params.signature, event.params.publicKey))
                        throw new Error()
                    var profile = await prisma.profile.findUnique({ where: { publicKey: event.params.publicKey } })
                    if (!profile) profile = await prisma.profile.create({ data: { publicKey: event.params.publicKey } })
                }

                if (requireAuth && !profile) throw new Error();

                const params = event.params.data && r.deserialize(event.params.data)

                try
                {
                    return {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: await resolver({ profile, params, event }) ?? null
                    } as any
                }
                catch (err)
                {
                    console.error(err)
                    const errRes = {
                        message: err.message,
                        stack: err.stack
                    }
                    return {
                        status: 500,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: errRes.message
                    } as any
                }
            }
        }
        return r
    }
}