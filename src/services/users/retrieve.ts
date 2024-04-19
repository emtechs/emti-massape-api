import { AppError } from '../../errors'
import { IUser } from '../../interfaces'
import { authApi, prisma } from '../../lib'

export const retrieveUserService = async (id: string) => {
  const [userResponse, user] = await Promise.all([
    authApi.get<IUser>(`users/${id}`),
    prisma.user.findUnique({
      where: { id },
    }),
  ])

  if (!user) throw new AppError('user not found', 404)

  return { ...userResponse.data, ...user }
}
