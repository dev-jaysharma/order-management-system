import { type AppType } from '@api/app'
import { hc } from 'hono/client'

const client = hc<AppType>('/')

export { client }