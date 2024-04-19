import { prisma } from '../../lib'
import { IStudentRequest } from '../../interfaces'
import { AppError } from '../../errors'

export const createStudentService = async ({
  name,
  registry,
}: IStudentRequest) => {
  let student = await prisma.student.findUnique({ where: { registry } })

  if (student) throw new AppError('student already exists', 409)

  student = await prisma.student.create({
    data: {
      name,
      registry,
    },
  })

  return student
}
