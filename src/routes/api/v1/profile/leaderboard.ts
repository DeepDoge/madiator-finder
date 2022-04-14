import { prisma } from "$/plugins/prisma"
import { apiRequest } from "$/routes/api/_api"
import type { PrismaClient } from "@prisma/client"

export const getLeaderboardRequest = apiRequest<
{
    after?: Parameters<PrismaClient['profile']['findUnique']>[0]['where']['publicKey']
    order?: 'desc' |'asc'
}
>()
(async ({ params, profile }) => {
    return await prisma.profile.findMany({
        ...(params.after ? { cursor: { publicKey: params.after } } : {}),
        where: { NOT: { nickname: null } },
        orderBy: { score: params.order ?? 'desc' },
        take: 100
    })
})
export const get = getLeaderboardRequest.requestHandler