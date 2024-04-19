import { z } from 'zod'
import { ServerConnectSchema, ServerCreateSchema } from '../schemas'

export type IServerRequest = z.infer<typeof ServerCreateSchema>

export type IServerConnectRequest = z.infer<typeof ServerConnectSchema>
