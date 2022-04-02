import { prisma } from "$/plugins/prisma"
import { api } from "$/routes/api/_api"
import type { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler<{ after, order }, any> = async (event) =>
{
    const order = event.params.order ?? 'desc'
    const after = event.params.after
    return await api(async () =>
    {
        const rows = await prisma.profile.findMany({
            ...(after ? { cursor: { publicKey: after } } : {}),
            where: { NOT: { nickname: null } },
            orderBy: { score: order },
            take: 100
        })

        return rows
    })
}