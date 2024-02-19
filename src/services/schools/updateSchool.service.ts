import { ISchoolUpdateRequest } from '../../interfaces'
import { prisma } from '../../lib'
import { AppError } from '../../errors'

export const updateSchoolService = async (
  id: string,
  { director_id, is_active, name }: ISchoolUpdateRequest,
) => {
  if (director_id) {
    const school = await prisma.school.findUnique({
      where: { id },
      select: { director_id: true },
    })

    if (school?.director_id)
      await prisma.schoolServer.deleteMany({
        where: { school_id: id, server_id: school.director_id },
      })
  }

  try {
    const school = await prisma.school.update({
      where: { id },
      data: {
        name,
        director_id,
        is_active,
      },
    })

    return school
  } catch {
    throw new AppError('school not found', 404)
  }
}
