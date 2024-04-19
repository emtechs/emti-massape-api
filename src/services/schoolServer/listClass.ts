import sortArray from 'sort-array'
import { IQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { retrieveClassYearService } from '../../services'

export const listClassSchoolServerService = async ({
  take,
  skip,
  school_id,
  user_id,
}: IQuery) => {
  if (take) take = +take
  if (skip) skip = +skip

  const [classData, total] = await Promise.all([
    prisma.classYear.findMany({
      take,
      skip,
      where: {
        school: { servers: { some: { school_id, server_id: user_id } } },
      },
      select: { key: true },
    }),
    prisma.classYear.count({
      where: {
        school: { servers: { some: { school_id, server_id: user_id } } },
      },
    }),
  ])

  const classesData = await classReturnArray(classData)

  const result = sortArray(classesData, {
    by: 'class_name',
    order: 'asc',
    computed: { class_name: (row) => row.class.name },
  })

  return {
    total,
    result,
  }
}

const classReturnArray = async (classData: { key: string }[]) => {
  const classesData = classData.map((el) => retrieveClassYearService(el.key))

  return Promise.all(classesData).then((clsData) => {
    return clsData
  })
}
