import { IQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { retrieveClassStudentService } from './retriveClassStudent.service'

export const listClassStudentService = async ({
  take,
  skip,
  name,
  class_id,
  school_id,
  year_id,
}: IQuery) => {
  if (take) take = +take
  if (skip) skip = +skip

  let where = {}

  if (name)
    where = {
      ...where,
      student: { name: { contains: name, mode: 'insensitive' } },
    }

  where = { ...where, class: { class_id, school_id, year_id } }

  const [classesData, total] = await Promise.all([
    prisma.classStudent.findMany({
      take,
      skip,
      where,
      select: { id: true },
      orderBy: { student: { name: 'asc' } },
    }),
    prisma.classStudent.count({ where }),
  ])

  return {
    total,
    result: await classStudentReturnArray(classesData),
  }
}

const classStudentReturnArray = async (classes: { id: string }[]) => {
  const classData = classes.map((el) => retrieveClassStudentService(el.id))

  return Promise.all(classData).then((data) => {
    return data.map((el) => {
      return { ...el, name: el.name.toUpperCase() }
    })
  })
}
