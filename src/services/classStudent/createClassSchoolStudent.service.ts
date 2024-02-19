import { prisma } from '../../lib'
import { IClassSchoolStudentRequest } from '../../interfaces'
import { AppError } from '../../errors'
import { createClassStudentService } from './createClassStudent.service'

export const createClassSchoolStudentService = async ({
  class_id,
  school_id,
  students,
  year_id,
}: IClassSchoolStudentRequest) => {
  const classData = await prisma.classYear.findFirst({
    where: { class_id, school_id, year_id },
    select: { id: true },
  })

  if (!classData) throw new AppError('class not found', 404)

  return await createClassStudentService({ class_id: classData.id, students })
}
