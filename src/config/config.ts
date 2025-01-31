import 'dotenv/config'

if (!process.env.SERVER_PORT) throw new Error('SERVER_PORT environment variable is missing')
if (!process.env.MONGO_URI) throw new Error('MONGO_URI environment variable is missing')
if (!process.env.COOKIE_KEY) throw new Error('COOKIE_KEY environment variable is missing')
if (!process.env.CORS_ORIGIN) throw new Error('CORS_ORIGIN environment variable is missing')
if (!process.env.SERVER_DOMAIN) throw new Error('SERVER_DOMAIN environment variable is missing')


export const SERVER_PORT = process.env.SERVER_PORT as string
export const MONGO_URI = process.env.MONGO_URI as string
export const COOKIE_KEY = process.env.COOKIE_KEY as string
export const CORS_ORIGIN = process.env.CORS_ORIGIN as string
export const SERVER_DOMAIN = process.env.SERVER_DOMAIN as string