import { IUserQuery, IUserRequest } from '../../interfaces'
import { prisma } from '../../lib'
import { listSchoolServerService } from '../../services'

export const listSchoolUserService = async (
  { skip, take }: IUserQuery,
  user: IUserRequest,
) => {
  if (take) take = +take
  if (skip) skip = +skip

  if (user.role === 'ADMIN') {
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
