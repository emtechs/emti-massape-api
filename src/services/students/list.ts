import { IStudentQuery } from '../../interfaces'
import { prisma } from '../../lib'

export const listStudentService = async ({
  take,
  skip,
  name,
  year,
  is_active,
}: IStudentQuery) => {
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

  if (year) where = { ...where, classes: { none: { class: { year } } } }

  if (name)
    where = {
      ...where,
      OR: [
        { name: { contains: name, mode: 'insensitive' } },
        { registry: { contains: name, mode: 'insensitive' } },
      ],
    }

  const [students, total] = await Promise.all([
    prisma.student.findMany({
      take,
      skip,
      where,
      orderBy: { name: 'asc' },
    }),
    prisma.student.count({ where }),
  ])

  return {
    total,
    result: students,
  }
}
