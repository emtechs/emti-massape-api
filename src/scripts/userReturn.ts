import { retrieveUserService } from '../services'

export const userReturnArray = async (usersData: { id: string }[]) => {
  const users = usersData.map((el) => retrieveUserService(el.id))

  return Promise.all(users).then((user) => {
    return user
  })
}
