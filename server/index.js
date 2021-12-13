import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from '../config'
import debug from 'debug'
import appData from './app.store'
import { find } from 'db'
import usersRouter from '../routes/users'
import linkTokenRouter from '../routes/linkToken'

// eslint-disable-next-line
import { redf, red, green } from '../logger'

const log = console.log

const printVars = (name) => {
  console.group(name)
  log('ACCESS_TOKEN', appData.accessToken)
  log('APP_PORT', appData.port)
  log('ITEM_ID', appData.itemId)
  log('PAYMENT_ID', appData.paymentId)
  log('PLAID_ANDROID_PACKAGE_NAME', appData.androidPackageName)
  log('PLAID_ENV', appData.plaidEnv)
  log('PLAID_CLIENT_ID', appData.clientId)
  log('PLAID_COUNTRY_CODES', appData.plaidCountryCodes)
  log('PLAID_PRODUCTS', appData.plaidProducts)
  log('PLAID_REDIRECT_URI', appData.plaidRedirectUri)
  log('PLAID_SECRET', appData.secret)
  log('PUBLIC_TOKEN', appData.publicToken)
  log('TRANSFER_ID', appData.transferId)
  console.groupEnd()
}

const moment = require('moment')

const lServer = debug('server')
// const lServerError = debug('server:ERROR')

const cfg = config()

printVars()
const app = express()

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/users', usersRouter)
app.use('/link-token', linkTokenRouter)

app.get('/health', async (req, res) => {
  try {
    res.send(JSON.stringify({ status: 'All good here.' }))
  } catch (e) {
    res.send(JSON.stringify({ status: 'Something went wrong.' }))
  }
})

app.get('/db-health', async (req, res) => {
  try {
    const r = await find('db-test')
    console.log('db-health: r', r)
    res.send(JSON.stringify({ status: 'All good here. Server & db are up.' }))
  } catch (e) {
    res.send(
      JSON.stringify({ status: 'Something went wrong. Likely a db thing.' })
    )
  }
})

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json')
  next()
})

// NEW ROUTES
// app.post('/api/info', function (request, response, next) {
//   response.json({
//     item_id: appData.itemId,
//     access_token: appData.accessToken,
//     products: appData.plaidProducts
//   })
// })

// app.post('/api/create_link_token', async function (request, response) {
//   const configs = {
//     user: {
//       client_user_id: 'user-id'
//     },
//     client_name: 'Plaid Quickstart',
//     products: appData.plaidProducts,
//     country_codes: appData.plaidCountryCodes,
//     language: 'en'
//   }

//   if (appData.plaidRedirectUri !== '') {
//     configs.redirect_uri = appData.plaidRedirectUri
//   }

//   if (appData.androidPackageName !== '') {
//     configs.android_package_name = appData.androidPackageName
//   }
//   try {
//     const createTokenResponse = await client.linkTokenCreate(configs)
//     // // prettyPrintResponse(createTokenResponse)
//     response.json(createTokenResponse.data)
//   } catch (error) {
//     // // prettyPrintResponse(error.response)
//     return response.json(formatError(error.response))
//   }
// })

// app.post('/api/set_access_token', async function (request, response, next) {
//   appData.publicToken = request.body.public_token
//   try {
//     const tokenResponse = await client.itemPublicTokenExchange({
//       public_token: appData.publicToken
//     })
//     // // prettyPrintResponse(tokenResponse)
//     appData.accessToken = tokenResponse.data.access_token
//     appData.itemId = tokenResponse.data.item_id
//     // if (appData.plaidProducts.includes('transfer')) {
//     //   appData.transferId = await authorizeAndCreateTransfer(appData.accessToken)
//     // }
//     response.json({
//       access_token: appData.accessToken,
//       item_id: appData.itemId,
//       error: null
//     })
//   } catch (error) {
//     // // prettyPrintResponse(error.response)
//     return response.json(formatError(error.response))
//   }
// })

// app.get('/api/auth', async function (request, response, next) {
//   try {
//     const authResponse = await client.authGet({
//       access_token: appData.accessToken
//     })
//     // // prettyPrintResponse(authResponse)
//     response.json(authResponse.data)
//   } catch (error) {
//     // prettyPrintResponse(error.response)
//     return response.json(formatError(error.response))
//   }
// })

// app.get('/api/transactions', async function (request, response, next) {
//   const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD')
//   const endDate = moment().format('YYYY-MM-DD')
//   const configs = {
//     access_token: appData.accessToken,
//     start_date: startDate,
//     end_date: endDate,
//     options: {
//       count: 250,
//       offset: 0
//     }
//   }
//   try {
//     const transactionsResponse = await client.transactionsGet(configs)
//     // prettyPrintResponse(transactionsResponse)
//     response.json(transactionsResponse.data)
//   } catch (error) {
//     // prettyPrintResponse(error.response)
//     return response.json(formatError(error.response))
//   }
// })

// app.get('/api/identity', async function (request, response, next) {
//   try {
//     const identityResponse = await client.identityGet({
//       access_token: appData.accessToken
//     })
//     // prettyPrintResponse(identityResponse)
//     response.json({ identity: identityResponse.data.accounts })
//   } catch (error) {
//     // prettyPrintResponse(error.response)
//     return response.json(formatError(error.response))
//   }
// })

// app.get('/api/balance', async function (request, response, next) {
//   try {
//     const balanceResponse = await client.accountsBalanceGet({
//       access_token: appData.accessToken
//     })
//     // prettyPrintResponse(balanceResponse)
//     response.json(balanceResponse.data)
//   } catch (error) {
//     // prettyPrintResponse(error.response)
//     return response.json(formatError(error.response))
//   }
// })

// app.get('/api/item', async function (request, response, next) {
//   try {
//     const itemResponse = await client.itemGet({
//       access_token: appData.accessToken
//     })
//     const configs = {
//       institution_id: itemResponse.data.item.institution_id,
//       country_codes: ['US']
//     }
//     const instResponse = await client.institutionsGetById(configs)
//     // prettyPrintResponse(itemResponse)
//     response.json({
//       item: itemResponse.data.item,
//       institution: instResponse.data.institution
//     })
//   } catch (error) {
//     // prettyPrintResponse(error.response)
//     return response.json(formatError(error.response))
//   }
// })

// app.get('/api/accounts', async function (request, response, next) {
//   try {
//     const accountsResponse = await client.accountsGet({
//       access_token: appData.accessToken
//     })
//     // prettyPrintResponse(accountsResponse)
//     response.json(accountsResponse.data)
//   } catch (error) {
//     // prettyPrintResponse(error.response)
//     return response.json(formatError(error.response))
//   }
// })

// END NEW ROUTES

// const prettyPrintResponse = (response) => {
//   console.log(util.inspect(response.data, { colors: true, depth: 4 }))
// }

const formatError = (error) => {
  return {
    error: { ...error.data, status_code: error.status }
  }
}
// NEW ROUTES

app.get('*', function (req, res) {
  throw new Error(`unknown route: ..${req.url}`)
})

// 'debug' is not working when NODE_ENV=testLocal
// Having both redf & lServerError is a work around
const logError = (err, verbose = false) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log()
    if (verbose) {
      redf('server.error: err', err) // works in test
      // lServerError(err) // works only in dev
    } else {
      redf('server.error: message', err.message) // works in test
      // lServerError(err.message) // works only in dev
    }
    console.log()
  }
}

const error = (err, req, res, next) => {
  let status
  const msg = err.message.toLowerCase()
  let retMsg = null
  if (msg.includes('favicon')) {
    return
  }
  red('server.error: msg-in', msg)

  if (msg === 'no authorization token was found') {
    status = 401
    logError(err)
    retMsg = 'Authorization failed'
  } else if (msg.includes('no document found')) {
    status = 404
    logError(err)
  } else if (msg.includes('unknown route')) {
    status = 400
    logError(err)
  } else if (msg.includes('unexpected string in json')) {
    status = 400
    logError(err)
  } else if (msg.includes('econnrefused')) {
    status = 500
    logError(err)
    retMsg = 'Internal server error'
  } else {
    status = 500
    logError(err, true)
  }

  res.status(status)
  red('server.error: msg-out', retMsg !== null ? retMsg : msg)
  res.send({ data: null, error: retMsg !== null ? retMsg : msg })
}

app.use(error)

if (!module.parent) {
  app.listen(cfg.port, () => {
    lServer(`Events API is listening on port ${cfg.port}`)
  })
}

const server = app.listen(appData.port, function () {
  console.log('plaid-quickstart server listening on port ' + appData.port)
})

export default app
