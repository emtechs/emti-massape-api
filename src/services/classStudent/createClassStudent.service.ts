import { prisma } from '../../lib'
import { IClassStudentRequest } from '../../interfaces'
import { AppError } from '../../errors'

export const createClassStudentService = async ({
  class_id,
  students,
}: IClassStudentRequest) => {
  const classData = students.map((el) => createClassStudent(class_id, el.id))

  return Promise.all(classData).then((data) => {
    return data
  })
}

const createClassStudent = async (class_id: string, student_id: string) => {
  const classStudentData = await prisma.classStudent.findFirst({
    where: { class_id, student_id },
  })

  if (classStudentData) throw new AppError('class already exists', 409)

  const classStudent = await prisma.classStudent.create({
    data: {
      class_id,
      student_id,
    },
  })

  return classStudent
}
