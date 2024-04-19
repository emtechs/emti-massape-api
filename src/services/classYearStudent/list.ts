import { prisma } from '../../lib'
import { IQuery } from '../../interfaces'

export const listClassYearStudentService = async ({ class_id }: IQuery) => {
  const [result, total] = await Promise.all([
    prisma.classYearStudent.findMany({ where: { class_id } }),
    prisma.classYearStudent.count({ where: { class_id } }),
  ])

  return { total, result }
}
