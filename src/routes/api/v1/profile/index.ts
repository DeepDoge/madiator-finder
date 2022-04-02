import { prisma } from "$/plugins/prisma"
import { api } from "$/routes/api/_api"
import type { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler<{ publicKey }, any> = async (event) =>
{
    const publicKey = event.params.publicKey
    return await api(async () => await prisma.profile.findUnique({ where: { publicKey }}))
}