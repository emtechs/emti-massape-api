import { IRequestUser, IUserQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { listSchoolServerService } from '../schoolServer'

export const listSchoolUserService = async (
  { skip, take }: IUserQuery,
  user: IRequestUser,
) => {
  if (take) take = +take
  if (skip) skip = +skip

  if (user.is_admin) {
    const [result, total] = await Promise.all([
      prisma.school.findMany({
        take,
        skip,
        where: { is_active: true },
        select: { id: true, name: true },
      }),
      prisma.school.count({
        where: { is_active: true },
      }),
    ])
    return { total, result }
  }

  return await listSchoolServerService({ take, skip, user_id: user.id })
}
