import { wrap } from 'routes/wrap'
import { find } from 'db'
import {
  TRANSACTIONS_COLLECTION_NAME,
  convertFieldValuesToUi
} from 'db/constants'
import { toBoolean, isEmpty } from 'validator'
import { isNil, mergeRight } from 'ramda'

// eslint-disable-next-line
import { red, green, logRequest } from 'logger'

const isEmptyOrUndefined = (val) => {
  if (isNil(val)) {
    return true
  }
  return isEmpty(val)
}

const get = wrap(async (req, res, next) => {
  const { params } = req
  const { description, showOmitted } = params
  const desc = isEmptyOrUndefined(description)
    ? {}
    : { description: { $regex: description, $options: 'im' } }
  const omitted = toBoolean(showOmitted) ? {} : { omit: false }
  const filter = mergeRight(desc, omitted)
  const data = await find(TRANSACTIONS_COLLECTION_NAME, filter)
  res.send(convertFieldValuesToUi(data))
})

export default get
