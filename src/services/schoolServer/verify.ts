import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const verifySchoolServerService = async (key: string) => {
  const server = await prisma.schoolServer.findUnique({
    where: { key },
    select: { key: true },
  })

  if (!server) throw new AppError('server not found', 404)
}
