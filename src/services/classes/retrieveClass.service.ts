import { AppError } from '../../errors'
import { IQuery } from '../../interfaces'
import { prisma } from '../../lib'

export const retrieveClassService = async (
  id: string,
  { school_id, year_id }: IQuery,
) => {
  const classData = await prisma.class.findUnique({
    where: { id },
    include: {
      _count: true,
      schools: { where: { school_id, year_id }, select: { _count: true } },
    },
  })

  if (!classData) throw new AppError('class not found', 404)

  let students = 0
  let frequencies = 0
  let tests = 0

  classData.schools.forEach((sc) => {
    students += sc._count.students
    frequencies += sc._count.frequencies
    tests += sc._count.tests
  })

  return {
    ...classData,
    schools: classData._count.schools,
    students,
    frequencies,
    tests,
  }
}
