import { IQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { retrieveClassService } from './retrieveClass.service'

export const listClassService = async ({
  take,
  skip,
  name,
  school_id,
  year_id,
  is_active,
}: IQuery) => {
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

  if (name) where = { ...where, name: { contains: name, mode: 'insensitive' } }
  if (school_id || year_id)
    where = {
      ...where,
      schools: { none: { school_id, year_id } },
    }

  const [classesData, total] = await Promise.all([
    prisma.class.findMany({
      take,
      skip,
      where,
      orderBy: { name: 'asc' },
      select: { id: true },
    }),
    prisma.class.count({ where }),
  ])

  return {
    total,
    result: await resultClassArray(classesData),
  }
}

const resultClassArray = async (
  classes: {
    id: string
  }[],
) => {
  const classData = classes.map((el) => retrieveClassService(el.id, {}))

  return Promise.all(classData).then((data) => {
    return data
  })
}
