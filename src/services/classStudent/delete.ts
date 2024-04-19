import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const deleteClassStudentService = async (key: string) => {
  try {
    await prisma.classStudent.delete({
      where: { key },
    })
  } catch {
    throw new AppError('student not found', 404)
  }
}
