import { IClassUpdateRequest } from '../../interfaces'
import { prisma } from '../../lib'
import { AppError } from '../../errors'

export const updateClassService = async (
  id: string,
  { is_active, name }: IClassUpdateRequest,
) => {
  try {
    const classData = await prisma.class.update({
      where: { id },
      data: {
        name,
        is_active,
      },
    })

    return classData
  } catch {
    throw new AppError('class not found', 404)
  }
}
