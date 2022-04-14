import { prisma } from "$/plugins/prisma"
import { apiRequest } from "$/routes/api/_api"

export const getCountersRequest = apiRequest<
{
}
>()
(async ({ params, profile }) => {
    return {
        videos: await prisma.lbryUrlMap.count({ where: { type: 'Video' } }),
        channels: await prisma.lbryUrlMap.count({ where: { type: 'Channel' } })
    }
})
export const get = getCountersRequest.requestHandler