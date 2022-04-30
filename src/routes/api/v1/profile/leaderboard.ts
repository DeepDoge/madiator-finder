import { prisma } from "$/plugins/prisma"
import { apiRequest } from "$/routes/api/_api"

export const getLeaderboardRequest = apiRequest<
    {}
>()
    (async ({ params, profile }) =>
    {
        return await prisma.profile.findMany({
            orderBy: { score: 'desc' },
            take: 100,
            where: { NOT: { score: 0 } }
        })
    })
export const get = getLeaderboardRequest.requestHandler