import { IServerRequest } from '../../interfaces'
import { connectSchoolServerService, createUserService } from '..'

export const createSchoolServerService = async (req_user: IServerRequest) => {
  const { schools } = req_user

  const { id } = await createUserService(req_user)

  return await connectSchoolServerService({ schools, server_id: id })
}
