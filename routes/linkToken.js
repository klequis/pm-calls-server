import express from 'express'
import { asyncWrapper } from './middleware'
import { formatError } from './routeHelpers'
import { config } from '../config'
import { plaidClient } from '../plaidClient'

const router = express.Router()

const cfg = config()
console.log('config', config)

router.post('/', async function (request, response) {
  const { userId, itemId } = request.body
  const configs = {
    user: {
      client_user_id: userId
    },
    client_name: 'Client Calls',
    products: cfg.plaidProducts,
    country_codes: cfg.plaidCountryCodes,
    language: 'en'
  }

  if (appData.plaidRedirectUri !== '') {
    configs.redirect_uri = appData.plaidRedirectUri
  }

  // if (appData.androidPackageName !== '') {
  //   configs.android_package_name = appData.androidPackageName
  // }
  try {
    const createTokenResponse = await plaidClient.linkTokenCreate(configs)
    // // prettyPrintResponse(createTokenResponse)
    response.json(createTokenResponse.data)
  } catch (error) {
    // // prettyPrintResponse(error.response)
    return response.json(formatError(error.response))
  }
})

export default router
