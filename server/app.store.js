// import { isEmpty } from 'ramda'
import { config } from '../config'
// require('dotenv').config()

const wdPort = 'port'
const wdClientId = 'clientId'
const wdSecretId = 'secret'
const wdPlaidEnv = 'plaidEnv'
const wdPlaidProducts = 'plaidProducts'
const wdPlaidCountryCodes = 'plaidCountryCodes'
const wdPlaidRedirectUri = 'plaidRedirectUri'
const wdAccessToken = 'accessToken'
const wdPublicToken = 'publicToken'
const wdItemId = 'itemId'
const wdPaymentId = 'paymentId'
const wdTransferId = 'transferId'
// const wdAndroidPackageName = ''

const log = console.log
const cfg = config()

// const printVars = (name: string) => {
//   console.group(name)
//   // log('ACCESS_TOKEN', this.accessToken)
//   // log('APP_PORT', appData.port)
//   // log('ITEM_ID', appData.itemId)
//   // log('PAYMENT_ID', appData.paymentId)
//   // log('PLAID_ANDROID_PACKAGE_NAME', appData.androidPackageName)
//   // log('PLAID_ENV', appData.plaidEnv)
//   // log('PLAID_CLIENT_ID', appData.clientId)
//   // log('PLAID_COUNTRY_CODES', appData.plaidCountryCodes)
//   // log('PLAID_PRODUCTS', appData.plaidProducts)
//   // log('PLAID_REDIRECT_URI', appData.plaidRedirectUri)
//   // log('PLAID_SECRET', appData.secret)
//   // log('PUBLIC_TOKEN', appData.publicToken)
//   // log('TRANSFER_ID', appData.transferId)
//   console.groupEnd()
// }

const data = new Map()

const propertySet = (property, newVal) => {
  const oldVal = data.get(property)
  log('** CHANGE: ', `${property} was: ${oldVal}, is: ${newVal}`)
  data.set(property, newVal)
}

export default class AppData {
  static get androidPackageName() {
    return ''
  }

  static set [wdAccessToken](token) {
    // data.set(wdAccessToken, token)
    propertySet(wdAccessToken, token)
  }

  static get [wdAccessToken]() {
    return data.get(wdAccessToken) || null
  }

  static get [wdPort]() {
    // return Number(process.env.PORT)
    return cfg.plaid.port
  }

  static get [wdClientId]() {
    // return process.env.PLAID_CLIENT_ID
    return cfg.plaid.plaidClientId
  }

  static get [wdSecretId]() {
    // return process.env.PLAID_SECRET
    return cfg.plaid.plaidSecret
  }

  static get [wdPlaidEnv]() {
    // return process.env.PLAID_ENV || ''
    return cfg.plaid.plaidEnv || ''
  }

  static get [wdPlaidProducts]() {
    // const str = process.env.PLAID_PRODUCTS || 'transactions'
    const str = cfg.plaid.plaidProducts || 'transactions'
    return str.split(',')
  }

  static get [wdPlaidCountryCodes]() {
    // const str = process.env.PLAID_COUNTRY_CODES || 'US'
    const str = cfg.plaid.plaidCountryCodes || 'US'
    return str.split(',')
  }

  static get [wdPlaidRedirectUri]() {
    // return process.env.PLAID_REDIRECT_URI || ''
    return cfg.plaid.plaidRedirectUri || ''
  }

  static set [wdPublicToken](token) {
    // data.set(wdPublicToken, token)
    propertySet(wdPublicToken, token)
  }

  static get [wdPublicToken]() {
    return data.get(wdPublicToken) || null
  }

  static set [wdItemId](id) {
    // data.set(wdItemId, id)
    propertySet(wdItemId, id)
  }

  static get [wdItemId]() {
    return data.get(wdItemId) || null
  }

  static get [wdPaymentId]() {
    return null
  }

  static get [wdTransferId]() {
    return null
  }
}
