import { prisma } from '../../lib'
import { IClassYearStudentRequest } from '../../interfaces'
import { AppError } from '../../errors'

export const createClassYearStudentService = async ({
  class_id,
  student_id,
}: IClassYearStudentRequest) => {
  let classYearStudent = await prisma.classYearStudent.findUnique({
    where: { class_id_student_id: { class_id, student_id } },
  })

  if (classYearStudent) throw new AppError('class already exists', 409)

  classYearStudent = await prisma.classYearStudent.create({
    data: { class_id, student_id },
  })

  return classYearStudent
}
