import { IUser } from '../../interfaces'
import { authApi, prisma } from '../../lib'

export const retrieveUserService = async (id: string) => {
  const [userResponse, user] = await Promise.all([
    authApi.get<IUser>(`users/${id}`),
    prisma.user.findUnique({
      where: { id },
    }),
  ])

  return { ...userResponse.data, ...user }
}
