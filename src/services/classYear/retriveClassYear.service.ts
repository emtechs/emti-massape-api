import { AppError } from '../../errors'
import { prisma } from '../../lib'
import { retrieveClassService } from '../../services'

export const retrieveClassYearService = async (id: string) => {
  const classYear = await prisma.classYear.findUnique({
    where: { id },
  })

  if (!classYear) throw new AppError('class not found', 404)

  const { class_id, school_id, year_id } = classYear

  const [data, school, year] = await Promise.all([
    retrieveClassService(class_id, {
      school_id,
      year_id,
    }),
    prisma.school.findUnique({
      where: { id: school_id },
      select: { id: true, name: true },
    }),
    prisma.year.findUnique({
      where: { id: year_id },
      select: { year: true },
    }),
  ])

  return { ...data, school, year: year?.year, key: id }
}
