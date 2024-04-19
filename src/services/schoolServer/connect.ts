import { IServerConnectRequest } from '../../interfaces'
import { prisma } from '../../lib'

export const connectSchoolServerService = async ({
  schools,
  server_id,
}: IServerConnectRequest) => {
  const data = schools.map((el) => {
    return { school_id: el.id, server_id }
  })

  return await prisma.schoolServer.createMany({ data })
}
