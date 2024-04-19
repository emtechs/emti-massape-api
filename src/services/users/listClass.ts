import { IRequestUser, IUserQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { listClassSchoolServerService } from '../../services'

export const listClassUserService = async (
  { skip, take, year }: IUserQuery,
  user: IRequestUser,
) => {
  if (take) take = +take
  if (skip) skip = +skip

  if (user.is_admin) {
    const [result, total] = await Promise.all([
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

    return { total, result }
  }

  return await listClassSchoolServerService({ take, skip, user_id: user.id })
}
