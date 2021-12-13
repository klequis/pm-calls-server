import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'
import { config } from './config'

const cfg = config()

const configuration = new Configuration({
  basePath: PlaidEnvironments[cfg.plaidEnv],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': cfg.plaidClientId,
      'PLAID-SECRET': cfg.plaidSecret,
      'Plaid-Version': '2020-09-14'
    }
  }
})

export const plaidClient = new PlaidApi(configuration)
