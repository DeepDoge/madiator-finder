import type { ServerResponse } from "@sveltejs/kit/types/hooks"

export async function api<T>(resolver: () => Promise<T>): Promise<ServerResponse>
{
    try
    {
        return {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(await resolver() ?? null)
        }
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
            body: JSON.stringify(errRes)
        }
    }
}