import { prisma } from '../../lib'
import { IClassYearRequest } from '../../interfaces'
import { AppError } from '../../errors'

export const createClassYearService = async ({
  classes,
  schools,
  year_id,
}: IClassYearRequest) => {
  const classData = classes.map((el) =>
    connectClassYear({ class_id: el.id, schools, year_id }),
  )

  return Promise.all(classData).then((data) => {
    return data
  })
}

const connectClassYear = async ({
  class_id,
  year_id,
  schools,
}: {
  class_id: string
  year_id: string
  schools: { id: string }[]
}) => {
  const schoolsData = schools.map((el) =>
    createClassYear({ class_id, school_id: el.id, year_id }),
  )

  return Promise.all(schoolsData).then((school) => {
    return school
  })
}

const createClassYear = async ({
  class_id,
  school_id,
  year_id,
}: {
  class_id: string
  school_id: string
  year_id: string
}) => {
  const classYearData = await prisma.classYear.findFirst({
    where: { class_id, school_id, year_id },
  })

  if (classYearData) throw new AppError('class already exists', 409)

  const classYear = await prisma.classYear.create({
    data: {
      class_id,
      school_id,
      year_id,
    },
  })

  return classYear
}
