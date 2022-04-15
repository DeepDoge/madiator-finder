import { prisma } from "$/plugins/prisma"
import { apiRequest } from "$/routes/api/_api"
import type { PrismaClient } from "@prisma/client"

export const getProfileRequest = apiRequest<
    Parameters<PrismaClient['profile']['findUnique']>[0]['where']
>()
    (async ({ params, profile }) =>
    {
        return await prisma.profile.findUnique({ where: { publicKey: params.publicKey } })
    })
export const get = getProfileRequest.requestHandler