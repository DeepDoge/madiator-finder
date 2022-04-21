import { prisma } from "$/plugins/prisma"
import type { PrismaClient } from "@prisma/client"
import { apiRequest } from "../../_api"

export const postProfileRequest = apiRequest<
    Pick<Parameters<PrismaClient['profile']['create']>[0]['data'], 'nickname'>
>()
    (async ({ params, profile }) =>
    {
        return await prisma.profile.delete({ where: { publicKey: profile.publicKey } })
    })
export const post = postProfileRequest.requestHandler