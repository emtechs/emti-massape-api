import { ISchoolQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { retrieveSchoolService } from '../../services'

export const listSchoolService = async ({
  is_active,
  take,
  skip,
  server_id,
  none_server_id,
  class_id,
}: ISchoolQuery) => {
  if (take) take = +take
  if (skip) skip = +skip

  let where = {}

  if (is_active) {
    switch (is_active) {
      case 'true':
        where = { ...where, is_active: true }
        break

      case 'false':
        where = { ...where, is_active: false }
        break
    }
  }

  if (none_server_id)
    where = { ...where, servers: { none: { server_id: none_server_id } } }

  if (server_id) where = { ...where, servers: { some: { server_id } } }

  if (class_id) where = { ...where, classes: { none: { class_id } } }

  const [schools, total] = await Promise.all([
    prisma.school.findMany({
      take,
      skip,
      where,
      orderBy: { name: 'asc' },
      select: { id: true },
    }),
    prisma.school.count({ where }),
  ])

  return {
    total,
    result: await schoolReturnArray(schools),
  }
}

const schoolReturnArray = async (schoolsData: { id: string }[]) => {
  const schools = schoolsData.map((el) => retrieveSchoolService(el.id, {}))

  return Promise.all(schools).then((school) => {
    return school.map((el) => {
      return {
        ...el,
        name: el.name.toUpperCase(),
      }
    })
  })
}
