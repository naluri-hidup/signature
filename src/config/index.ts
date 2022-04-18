// dotenv initialization
import 'dotenv/config'

import development from './development'

export interface Config {
  PORT: number
  API_KEY: string
}

export const NODE_ENV = process.env.NODE_ENV || 'development'

const getConfig = (): Config => {
  switch (NODE_ENV) {
    case 'dev':
    case 'development': {
      return development
    }
    default: {
      return development
    }
  }
}

export default getConfig
