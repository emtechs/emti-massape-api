import { prisma } from '../../lib'
import { ISchoolRequest } from '../../interfaces'

export const createSchoolService = async ({ name }: ISchoolRequest) => {
  const school = await prisma.school.create({
    data: {
      name,
    },
  })

  return school
}
