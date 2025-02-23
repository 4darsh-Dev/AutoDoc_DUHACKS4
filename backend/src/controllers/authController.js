const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const { supabase } = require('../utils/supabaseClient')
const prisma = require('../utils/prismaClient')

const register = async (req, res) => {
  console.log('Request received')

  // Step 1: Validate input fields
  console.log('Validating input fields')
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array())
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    email,
    password,
    firstName,
    lastName,
    role,
    addr,
    phone,
    gender,
    username,
    image,
    dob
  } = req.body
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    // Store user data
    console.log('Storing user data in the database')
    await prisma.user.create({
      data: {
        email: email,
        userName: username,
        firstName: firstName,
        lastName: lastName,
        role: role || 'user', // Default to 'user' if role not provided
        gender: gender,
        phone: phone,
        image: image,
        dob: dob,
        password: hashedPassword
      }
    })

    // Generate tokens
    const accessToken = jwt.sign(
      { role: role, email: email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    )
    const refreshToken = jwt.sign(
      { role: role, email: email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    )
    // Step 5: Return the tokens and user details to the client
    console.log('Returning tokens and user details to the client')
    return res.status(200).json({
      message: 'User registered and logged in successfully',
      user: {
        role: role,
        email: email
      },
      tokens: {
        accessToken,
        refreshToken
      }
    })
  } catch (err) {
    // Step 6: Handle any other server errors
    console.log('Internal server error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

let refreshTokens = []

const login = async (req, res) => {
  console.log('req received')
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const accessToken = jwt.sign(
      { role: user.role, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    )
    const refreshToken = jwt.sign(
      { role: user.role, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    )
    refreshTokens.push(refreshToken)

    res.json({ accessToken, refreshToken })
  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const token = (req, res) => {
  const { token } = req.body
  if (!token) return res.sendStatus(401)
  if (!refreshTokens.includes(token)) return res.sendStatus(403)

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    )
    res.json({ accessToken, user })
  })
}

module.exports = {
  register,
  login,
  token
}
