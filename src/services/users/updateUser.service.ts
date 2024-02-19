import { AppError } from '../../errors'
import { IRole, IUserUpdateRequest } from '../../interfaces'
import { prisma } from '../../lib'
import { UserReturnSchema } from '../../schemas'

export const updateUserService = async (
  id: string,
  { is_active, role }: IUserUpdateRequest,
  role_user: IRole,
) => {
  if (role) {
    if (role_user !== 'ADMIN')
      throw new AppError('User is not allowed to change his role', 400)
    if (role === 'ADMIN')
      await Promise.all([
        prisma.schoolServer.deleteMany({ where: { server_id: id } }),
        prisma.user.update({
          where: { id },
          data: { director_school: { deleteMany: { director_id: id } } },
        }),
      ])
  }

  if (is_active !== undefined) {
    if (role_user !== 'ADMIN')
      throw new AppError('User is not allowed to change his is_active', 400)
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        is_active,
        role,
      },
    })

    return UserReturnSchema.parse(user)
  } catch {
    throw new AppError('user not found', 404)
  }
}
