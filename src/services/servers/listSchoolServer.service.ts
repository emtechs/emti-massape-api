import { ISchoolQuery } from '../../interfaces'
import { prisma } from '../../lib'

export const listSchoolServerService = async ({
  name,
  user_id,
  skip,
  take,
}: ISchoolQuery) => {
  if (take) take = +take
  if (skip) skip = +skip

  const [schoolsData, total] = await Promise.all([
    prisma.schoolServer.findMany({
      take,
      skip,
      where: {
        server_id: user_id,
        school: { name: { contains: name, mode: 'insensitive' } },
      },
      include: { school: { select: { id: true, name: true } } },
      orderBy: { school: { name: 'asc' } },
    }),
    prisma.schoolServer.count({
      where: {
        server_id: user_id,
        school: { name: { contains: name, mode: 'insensitive' } },
      },
    }),
  ])

  const result = schoolsData.map((el) => {
    const { id: key, role, school } = el
    const { id, name } = school

    return { id, name, key, role }
  })

  return {
    total,
    result,
  }
}
