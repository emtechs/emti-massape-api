import { AppError } from '../../errors'
import { IQuery } from '../../interfaces'
import { prisma } from '../../lib'

export const retrieveSchoolService = async (
  id: string,
  { class_id, year }: IQuery,
) => {
  const school = await prisma.school.findUnique({
    where: { id },
    include: {
      _count: true,
      classes: { where: { class_id, year }, select: { _count: true } },
    },
  })

  if (!school) throw new AppError('school not found', 404)

  let students = 0

  school.classes.forEach((cl) => {
    students += cl._count.students
  })

  return {
    ...school,
    servers: school._count.servers,
    classes: school._count.classes,
    students,
  }
}
