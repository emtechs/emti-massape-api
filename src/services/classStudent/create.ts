import { prisma } from '../../lib'
import { IClassStudentRequest } from '../../interfaces'
import { AppError } from '../../errors'

export const createClassStudentService = async ({
  class_id,
  student_id,
  year,
}: IClassStudentRequest) => {
  let classStudent = await prisma.classStudent.findUnique({
    where: { year_class_id_student_id: { year, class_id, student_id } },
  })

  if (!classStudent) throw new AppError('class not found', 404)

  classStudent = await prisma.classStudent.create({
    data: { class_id, year, student_id },
  })

  return classStudent
}
