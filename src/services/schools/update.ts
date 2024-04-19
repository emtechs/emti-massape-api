import { ISchoolUpdateRequest } from '../../interfaces'
import { prisma } from '../../lib'
import { AppError } from '../../errors'

export const updateSchoolService = async (
  id: string,
  { is_active, name }: ISchoolUpdateRequest,
) => {
  try {
    const school = await prisma.school.update({
      where: { id },
      data: {
        name,
        is_active,
      },
    })

    return school
  } catch {
    throw new AppError('school not found', 404)
  }
}
