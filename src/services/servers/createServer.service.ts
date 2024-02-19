import { ISchoolServerRequest } from '../../interfaces'
import { connectServerService, createUserService } from '../../services'

export const createServerService = async ({
  id,
  schools,
  role,
}: ISchoolServerRequest) => {
  await createUserService({ id })

  await connectServerService({ id, schools, role })
}
