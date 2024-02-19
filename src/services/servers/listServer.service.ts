import sortArray from 'sort-array'
import { IQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { retrieveServerService } from './retrieveServer.service'

export const listServerService = async ({
  take,
  skip,
  order,
  school_id,
}: IQuery) => {
  if (take) take = +take
  if (skip) skip = +skip

  let result = []

  const [workSchools, total] = await Promise.all([
    prisma.schoolServer.findMany({
      take,
      skip,
      where: { school_id },
      select: { id: true },
    }),
    prisma.schoolServer.count({
      where: { school_id },
    }),
  ])

  result = await userReturnArray(workSchools)

  if (order) result = sortArray(result, { by: order, order: 'asc' })

  return {
    total,
    result,
  }
}

const userReturnArray = async (usersData: { id: string }[]) => {
  const users = usersData.map((el) => retrieveServerService(el.id))

  return Promise.all(users).then((user) => {
    return user.map((el) => {
      return { ...el, name: el.name.toUpperCase() }
    })
  })
}
