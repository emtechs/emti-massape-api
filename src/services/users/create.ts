import { authApi, emtiApi, prisma } from '../../lib'
import { IUserRequest } from '../../interfaces'
import { AppError } from '../../errors'

export const createUserService = async (user_req: IUserRequest) => {
  const { data } = await authApi.post<{ id: string }>('users', user_req)

  const { id } = data

  const userData = await prisma.user.findUnique({
    where: { id },
  })

  if (userData) throw new AppError('user already exists', 409)

  const { is_admin } = user_req

  const [user] = await Promise.all([
    prisma.user.create({ data: { id, is_admin } }),
    emtiApi.post('moduleuser', {
      modules: [
        {
          id: '60bdd146-f0b3-4fab-90c0-a7ac603209b8',
        },
        {
          id: 'd1f200eb-a4c7-48b9-a8f6-17b2102b676c',
        },
      ],
      user_id: id,
    }),
  ])

  return user
}
