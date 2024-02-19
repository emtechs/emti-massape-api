import sortArray from 'sort-array'
import { IUserQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { retrieveUserService } from './retrieveUser.service'

export const listUserService = async (
  { is_active, role, skip, take, order, user_id, school_id }: IUserQuery,
  id: string,
) => {
  if (take) take = +take
  if (skip) skip = +skip

  let where = {}
  let result = []

  if (role) where = { ...where, role }

  if (is_active) {
    switch (is_active) {
      case 'true':
        where = { ...where, is_active: true }
        break

      case 'false':
        where = { ...where, is_active: false }
        break
    }
  }

  if (school_id) where = { ...where, work_school: { none: { school_id } } }

  where = { ...where, NOT: [{ id }, { id: user_id }] }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      take,
      skip,
      where,
      select: { id: true },
    }),
    prisma.user.count({ where }),
  ])

  result = await userReturnArray(users)

  if (order) result = sortArray(result, { by: order, order: 'asc' })

  return {
    total,
    result,
  }
}

const userReturnArray = async (usersData: { id: string }[]) => {
  const users = usersData.map((el) => retrieveUserService(el.id))

  return Promise.all(users).then((user) => {
    return user.map((el) => {
      return { ...el, name: el.name.toUpperCase() }
    })
  })
}
