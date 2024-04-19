import { AppError } from '../../errors'
import { prisma } from '../../lib'
import { retrieveSchoolService, retrieveUserService } from '../../services'

export const retrieveSchoolServerService = async (key: string) => {
  const server = await prisma.schoolServer.findUnique({
    where: { key },
    select: { school_id: true, server_id: true },
  })

  if (!server) throw new AppError('server not found', 404)

  const { school_id, server_id } = server

  const [school, user] = await Promise.all([
    retrieveSchoolService(school_id, {}),
    retrieveUserService(server_id),
  ])

  return { key, school, user }
}
