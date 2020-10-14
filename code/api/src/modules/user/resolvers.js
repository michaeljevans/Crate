// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// This jsonwebtoken turns the user details into an encrypted hash that is stored as a cookie
// when a user is logged in. 

// App Imports
import serverConfig from '../../config/server'
import params from '../../config/params'
import models from '../../setup/models'

// Create
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await models.User.findOne({ where: { email } })
  //findOne is Sequelize method. In this case it is looking for email in database that already exists 
  if (!user) {
    // User does not exists
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)

    return await models.User.create({
      name,
      email,
      password: passwordHashed
    })
  } else {
    // User exists
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
}

// Update
export async function update(parentValue, { id, style }, { auth }) {
  if (auth.user) {
    return await models.User.update(
      {
        style
      },
      { where: { id } }
    )
  } else {
    throw new Error('Style could not be updated.')
  }
}

export async function login(parentValue, { email, password }) {
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    throw new Error(`We do not have any user registered with ${ email } email address. Please signup.`)
  } else {
    const userDetails = user.get()

    // User exists
    const passwordMatch = await bcrypt.compare(password, userDetails.password)

    if (!passwordMatch) {
      // Incorrect password
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
    } else {
      const userDetailsToken = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role
      }

      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, serverConfig.secret)
      }
    }
  }
}
export async function updateUser(parentValue, { id, style }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.user) {
    return await models.User.update(
      {
        style
      },
      { where: { id } }
    )
  } else {
    throw new Error('Operation denied.')
  }
}
// Get by ID
export async function getById(parentValue, { id }) {
  return await models.User.findOne({ where: { id } })
}

// Get all
export async function getAll() {
  return await models.User.findAll()
}

// Delete
export async function remove(parentValue, { id }) {
  return await models.User.destroy({ where: { id } }) 
}

// User genders
export async function getGenders() {
  return Object.values(params.user.gender)
}
