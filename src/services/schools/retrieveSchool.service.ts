import { AppError } from '../../errors'
import { IQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { retrieveUserService } from '../users'

interface ISchool {
  id: string
  name: string
  is_active: boolean
  created_at: Date
  director_id: string | null
  servers: number
  classes: number
  students: number
  frequencies: number
  tests: number
}

export const retrieveSchoolService = async (
  id: string,
  { class_id, year_id }: IQuery,
) => {
  const schoolData = await prisma.school.findUnique({
    where: { id },
    include: {
      _count: true,
      classes: { where: { class_id, year_id }, select: { _count: true } },
    },
  })

  if (!schoolData) throw new AppError('school not found', 404)

  let students = 0
  let frequencies = 0
  let tests = 0

  schoolData.classes.forEach((cl) => {
    students += cl._count.students
    frequencies += cl._count.frequencies
    tests += cl._count.tests
  })

  const school: ISchool = {
    ...schoolData,
    servers: schoolData._count.servers,
    classes: schoolData._count.classes,
    students,
    frequencies,
    tests,
  }

  if (schoolData.director_id) {
    const director = await retrieveUserService(schoolData.director_id)
    return {
      ...school,
      director: { ...director, name: director.name.toUpperCase() },
    }
  }

  return school
}
