const { check } = require('express-validator')
const db = require('../db')
const { compare } = require('bcryptjs')

//password
const password = check('password')
  .isLength({ min: 6, max: 15 })
  .withMessage('Le mot de passe doit contenir entre 6 et 15 charactères.')

//email
const email = check('email')
  .isEmail()
  .withMessage('Fournissez un email valide.')

//role
const role = check('role')


//check if email exists
const emailExists = check('email').custom(async (value) => {
  const { rows } = await db.query('SELECT * from users WHERE email = $1', [
    value,
  ])

  if (rows.length) {
    throw new Error('Cet email existe déjà.')
  }
})

//login validation
const loginFieldsCheck = check('email').custom(async (value, { req }) => {
  const user = await db.query('SELECT * from users WHERE email = $1', [value])

  if (!user.rows.length) {
    throw new Error("Cet email n'existe pas")
  }

  const validPassword = await compare(req.body.password, user.rows[0].password)

  if (!validPassword) {
    throw new Error('Mot de passe incorrect')
  }

  if (user.rows[0].role !== req.body.role) {
    throw new Error('Rôle incorrect')
  }

  req.user = user.rows[0]
})


module.exports = {
  registerValidation: [email, password, role, emailExists],
  loginValidation: [loginFieldsCheck],
}