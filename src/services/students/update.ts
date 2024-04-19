import { prisma } from '../../lib'
import { AppError } from '../../errors'
import { IStudentUpdateRequest } from '../../interfaces'

export const updateStudentService = async (
  { name, registry, is_active }: IStudentUpdateRequest,
  id: string,
) => {
  try {
    const student = await prisma.student.update({
      where: { id },
      data: { name, registry, is_active },
    })

    return student
  } catch {
    throw new AppError('student not found', 404)
  }
}
