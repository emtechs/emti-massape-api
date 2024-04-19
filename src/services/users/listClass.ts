import sortArray from 'sort-array'
import { IRequestUser, IUserQuery } from '../../interfaces'
import { prisma } from '../../lib'
import {
  listClassSchoolServerService,
  retrieveClassYearService,
} from '../../services'

export const listClassUserService = async (
  { skip, take, year }: IUserQuery,
  user: IRequestUser,
) => {
  if (take) take = +take
  if (skip) skip = +skip

  if (user.is_admin) {
    const [classData, total] = await Promise.all([
      prisma.classYear.findMany({
        take,
        skip,
        where: { year },
        select: { key: true },
      }),
      prisma.classYear.count({
        where: { year },
      }),
    ])

    const classesData = await classReturnArray(classData)

    const result = sortArray(classesData, {
      by: 'class_name',
      order: 'asc',
      computed: { class_name: (row) => row.class.name },
    })

    return { total, result }
  }

  return await listClassSchoolServerService({ take, skip, user_id: user.id })
}

const classReturnArray = async (classData: { key: string }[]) => {
  const classesData = classData.map((el) => retrieveClassYearService(el.key))

  return Promise.all(classesData).then((clsData) => {
    return clsData
  })
}
