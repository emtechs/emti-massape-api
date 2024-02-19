import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const deleteClassStudentService = async (id: string) => {
  try {
    await prisma.classStudent.delete({
      where: { id },
    })
  } catch {
    throw new AppError('student not found', 404)
  }
}
