import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const retrieveClassYearService = async (key: string) => {
  const classYear = await prisma.classYear.findUnique({
    where: { key },
  })

  if (!classYear) throw new AppError('class not found', 404)

  return classYear
}
