import { prisma } from '../../lib'
import { IClassYearRequest } from '../../interfaces'
import { AppError } from '../../errors'

export const createClassYearService = async ({
  class_id,
  school_id,
  year,
}: IClassYearRequest) => {
  let classYear = await prisma.classYear.findUnique({
    where: { year_class_id_school_id: { class_id, school_id, year } },
  })

  if (classYear) throw new AppError('class already exists', 409)

  classYear = await prisma.classYear.create({
    data: {
      class_id,
      school_id,
      year,
    },
  })

  return classYear
}
