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

export const postProfileRequest = apiRequest<
    Pick<Parameters<PrismaClient['profile']['create']>[0]['data'], 'nickname'>
>()
    (async ({ params, profile }) =>
    {
        return await prisma.profile.update({
            where: { publicKey: profile.publicKey },
            data: { nickname: params.nickname.trim() || null }
        })
    })
export const post = postProfileRequest.requestHandler
