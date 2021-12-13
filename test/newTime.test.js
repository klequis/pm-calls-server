import { describe } from 'mocha'
import { updateTimestamps } from 'src/routes/helpers'
import { nanoid } from 'nanoid'
import { expect } from 'chai'
import * as R from 'ramda'

const makeNewObj = () => {
  return {
    id: nanoid()
  }
}

const makeUpdateObj = () => {
  return {
    id: nanoid(),
    createdAt: 'field-not-empty'
  }
}

// OK I'm here and really tired
// Use R.all or similar
// check has('createdAt'), has('updatedAt), isISOString('createdAt'), isISOString('updatedAt')
const hasBoth = (obj) => {
  return R.has('createdAt')(ob)
}

describe('updateTimestamps', function () {
  it('new obj should get 2 fields', function () {
    const obj1 = makeNewObj()
    const obj2 = updateTimestamps(obj)
    expect()
  })
})
