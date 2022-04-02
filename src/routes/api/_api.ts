import type { RequestHandlerOutput, ResponseBody } from "@sveltejs/kit/types"

export async function api<T extends ResponseBody>(resolver: () => Promise<any>): Promise<RequestHandlerOutput<T>>
{
    try
    {
        return {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: await resolver() ?? null
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
            body: errRes.message
        }
    }
}