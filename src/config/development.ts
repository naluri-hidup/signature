import { Config } from './index'

const config: Config = {
  PORT: parseInt(process.env.PORT || '3000'),
  API_KEY: String(process.env.API_KEY)
}

export default config
