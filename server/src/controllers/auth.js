const db = require('../db')
const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { SECRET } = require('../constants')

exports.getUsers = async (req, res) => {
  
  try {
    const { rows } = await db.query('select user_id, email, role from users')

    return res.status(200).json({
      success: true,
      users: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}


exports.register = async (req, res) => {
  const { email, role, password } = req.body
  try {
    const hashedPassword = await hash(password, 10)

    await db.query('insert into users(email, role, password) values ($1 , $2, $3)', [
      email,
      role,
      hashedPassword,
    ])

    return res.status(201).json({
      success: true,
      message: 'Inscription réalisée avec succès',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.login = async (req, res) => {
  let user = req.user

  let payload = {
    id: user.user_id,
    email: user.email,
  }

  
  try {
    const token = await sign(payload, SECRET)
       
    return res.status(200).cookie('token', token, { httpOnly: true }).json(
      {
      success: true,
      info: 'Connexion réalisée avec succès',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}



exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

