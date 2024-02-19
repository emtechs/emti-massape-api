import { prisma } from '../../lib'
import { IClassRequest } from '../../interfaces'
import { AppError } from '../../errors'

export const createClassService = async ({ name }: IClassRequest) => {
  let classData = await prisma.class.findUnique({
    where: { name },
  })

  if (classData) throw new AppError('class already exists', 409)

  classData = await prisma.class.create({
    data: { name },
  })

  return classData
}
