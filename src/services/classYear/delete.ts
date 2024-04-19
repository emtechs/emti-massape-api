import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const deleteClassYearService = async (key: string) => {
  try {
    await prisma.classYear.delete({
      where: { key },
    })
  } catch {
    throw new AppError('class not found', 404)
  }
}
