import { AppError } from '../../errors'
import { prisma } from '../../lib'
import { retrieveUserService } from '../users'

export const retrieveServerService = async (id: string) => {
  const server = await prisma.schoolServer.findUnique({
    where: { id },
    select: { role: true, server_id: true },
  })

  if (!server) throw new AppError('server not found', 404)

  const { role, server_id } = server

  const user = await retrieveUserService(server_id)

  return { ...user, role, key: id }
}
