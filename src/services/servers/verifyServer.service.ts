import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const verifyServerService = async (id: string) => {
  const server = await prisma.schoolServer.findUnique({
    where: { id },
    select: { id: true },
  })

  if (!server) throw new AppError('server not found', 404)
}
