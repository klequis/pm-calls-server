import express, { json } from 'express'
import { find, insertOne } from 'db'
import { USERS_COLLECTION_NAME } from 'db/constants'
import { asyncWrapper } from '../middleware'
import { green } from 'logger'

const router = express.Router()

// router.post(
//   '/',
//   asyncWrapper(async (req, res) => {
//     const { username } = req.body
//     const userExists = await find(USERS_COLLECTION_NAME, {})

//     if (userExists.length === 0) {
//       const userAdded = await insertOne(USERS_COLLECTION_NAME, {
//         username
//       })
//       console.log('userAdded', userAdded)
//       res.send(userAdded)
//     } else {
//       res.send(userExists)
//     }
//   })
// )

// const readUser = async({ username, _id }) => {
//   const userExists
// }

// const userExists = async (id) => {
//   // TODO: This may not work as I may need to convert to ObjectId?
//   const userExists = find(USERS_COLLECTION_NAME, { _id: id })
//   return userExists.length === 1
// }

const createUser = async (username) => {
  const newUser = await insertOne(USERS_COLLECTION_NAME, {
    username
  })
  return newUser
}

/**
 * @param {string} username
 * @returns {array} [{ username: string, _id: string }]
 * @description: Always return array of one
 */
// TODO: Given only using `username` and users are for now
//       identified by their `_id`, I don't need to check if
//       a user already exists since every user added will
//       be a new user
router.post(
  '/',
  asyncWrapper(async (req, res) => {
    const { username } = req.body
    const newUser = await createUser(username)
    res.json(newUser)
  })
)

export default router
