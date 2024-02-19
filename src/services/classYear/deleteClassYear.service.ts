import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const deleteClassYearService = async (id: string) => {
  try {
    await prisma.classYear.delete({
      where: { id },
    })
  } catch {
    throw new AppError('class not found', 404)
  }
}
