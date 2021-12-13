import * as R from 'ramda'

export const formatError = (error) => {
  return {
    error: { ...error.data, status_code: error.status }
  }
}

const newTime = new Date().toISOString()

export const updateTimestamps = (obj) => {
  const t = newTime()
  return R.has('createdAt')(obj)
    ? R.mergeRight(obj, { updatedAt: t })
    : R.mergeRight(obj, { createdAt: t, updatedAt: t })
}
