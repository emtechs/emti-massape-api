import { AppError } from '../../errors'
import { prisma } from '../../lib'
import { retrieveClassYearService } from '../../services'

export const retrieveClassStudentService = async (id: string) => {
  const classStudent = await prisma.classStudent.findUnique({
    where: { id },
  })

  if (!classStudent) throw new AppError('class not found', 404)

  const { class_id, student_id } = classStudent

  const [data, student] = await Promise.all([
    retrieveClassYearService(class_id),
    prisma.student.findUnique({
      where: { id: student_id },
      select: { id: true, name: true, registry: true },
    }),
  ])

  if (!student) throw new AppError('student not found', 404)

  return { ...student, class: data, key: id }
}
