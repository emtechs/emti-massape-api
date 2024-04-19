import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const retrieveClassStudentService = async (key: string) => {
  const classStudent = await prisma.classStudent.findUnique({
    where: { key },
  })

  if (!classStudent) throw new AppError('class not found', 404)

  return classStudent
}
