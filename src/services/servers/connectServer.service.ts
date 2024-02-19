import { AppError } from '../../errors'
import { IRole, ISchoolServerRequest } from '../../interfaces'
import { prisma } from '../../lib'
import { updateSchoolService } from '../schools'

export const connectServerService = async ({
  id,
  schools,
  role,
}: ISchoolServerRequest) => {
  const schoolsData = schools.map((el) =>
    connectSchoolServer({ id, school_id: el.id, role }),
  )

  return Promise.all(schoolsData).then((school) => {
    return school
  })
}

interface IConnectSchoolServer {
  id: string
  school_id: string
  role?: IRole
}

const connectSchoolServer = async ({
  id: server_id,
  role,
  school_id,
}: IConnectSchoolServer) => {
  const serverData = await prisma.schoolServer.findFirst({
    where: { server_id, school_id },
  })

  if (serverData) throw new AppError('server already exists', 409)

  if (role === 'DIRET')
    await updateSchoolService(school_id, { director_id: server_id })

  return await prisma.schoolServer.create({
    data: { role, school_id, server_id },
  })
}
