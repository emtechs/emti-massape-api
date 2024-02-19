import { IQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { retrieveClassYearService } from './retriveClassYear.service'

export const listClassYearService = async ({
  take,
  skip,
  name,
  school_id,
  year_id,
}: IQuery) => {
  if (take) take = +take
  if (skip) skip = +skip

  let where = {}

  if (name)
    where = {
      ...where,
      class: { name: { contains: name, mode: 'insensitive' } },
    }

  where = { ...where, year_id, school_id }

  const [classesData, total] = await Promise.all([
    prisma.classYear.findMany({
      take,
      skip,
      where,
      select: { id: true },
      orderBy: { class: { name: 'asc' } },
    }),
    prisma.classYear.count({ where }),
  ])

  return {
    total,
    result: await classYearReturnArray(classesData),
  }
}

const classYearReturnArray = async (classes: { id: string }[]) => {
  const classData = classes.map((el) => retrieveClassYearService(el.id))

  return Promise.all(classData).then((data) => {
    return data.map((el) => {
      return { ...el, name: el.name.toUpperCase() }
    })
  })
}
