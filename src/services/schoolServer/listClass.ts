import { IQuery } from '../../interfaces'
import { prisma } from '../../lib'

export const listClassSchoolServerService = async ({
  take,
  skip,
  school_id,
  user_id,
}: IQuery) => {
  if (take) take = +take
  if (skip) skip = +skip

  const [result, total] = await Promise.all([
    prisma.classYear.findMany({
      take,
      skip,
      where: {
        school: { servers: { some: { school_id, server_id: user_id } } },
      },
      select: { key: true },
    }),
    prisma.classYear.count({
      where: {
        school: { servers: { some: { school_id, server_id: user_id } } },
      },
    }),
  ])

  return {
    total,
    result,
  }
}
