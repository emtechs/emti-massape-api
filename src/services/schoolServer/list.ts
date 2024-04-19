import { IQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { retrieveSchoolServerService } from '../../services'

export const listSchoolServerService = async ({
  take,
  skip,
  school_id,
  user_id,
}: IQuery) => {
  if (take) take = +take
  if (skip) skip = +skip

  const [servers, total] = await Promise.all([
    prisma.schoolServer.findMany({
      take,
      skip,
      where: { school_id, server_id: user_id },
      select: { key: true },
    }),
    prisma.schoolServer.count({
      where: { school_id, server_id: user_id },
    }),
  ])

  return {
    total,
    result: await serverReturnArray(servers),
  }
}

const serverReturnArray = async (serversData: { key: string }[]) => {
  const servers = serversData.map((el) => retrieveSchoolServerService(el.key))

  return Promise.all(servers).then((server) => {
    return server
  })
}
