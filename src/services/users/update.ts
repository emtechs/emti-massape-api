import { AppError } from '../../errors'
import { IUserUpdateRequest } from '../../interfaces'
import { prisma } from '../../lib'
import { UserReturnSchema } from '../../schemas'

export const updateUserService = async (
  id: string,
  data: IUserUpdateRequest,
  is_admin_user: boolean,
) => {
  const { is_active, is_admin } = data

  if (is_admin !== undefined) {
    if (!is_admin_user)
      throw new AppError('User is not allowed to change his role', 400)
    if (is_admin)
      await prisma.schoolServer.deleteMany({ where: { server_id: id } })
  }

  if (is_active !== undefined) {
    if (!is_admin_user)
      throw new AppError('User is not allowed to change his is_active', 400)
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        is_active,
        is_admin,
      },
    })

    return UserReturnSchema.parse(user)
  } catch {
    throw new AppError('user not found', 404)
  }
}
