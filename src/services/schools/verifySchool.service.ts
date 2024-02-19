import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const verifySchoolService = async (id: string) => {
  const school = await prisma.school.findUnique({
    where: { id },
    select: { id: true },
  })

  if (!school) throw new AppError('school not found', 404)
}
