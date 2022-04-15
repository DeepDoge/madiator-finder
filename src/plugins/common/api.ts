import type { ApiRequest } from "$/routes/api/_api"
import type { Profile } from "@prisma/client"

export async function request<T extends ApiRequest>(apiPath: string, data: T['TYPE']['IN'], method: 'GET' | 'POST' = 'GET')
{
    if (typeof window === 'undefined') return

    const url = new URL(`${location.protocol}//${location.host}/api${apiPath}`)
    // url.pathname = ``
    url.searchParams.set('data', JSON.stringify(data))
    const profile: Profile = null
    if (profile?.publicKey) url.searchParams.set('publicKey', profile.publicKey)
    return await (await fetch(url.href, { method })).json() as T['TYPE']['OUT']
}