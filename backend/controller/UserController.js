import User from '../model/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getUser = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: ['id', 'name', 'email'],
    })
    res.json(user)
  } catch (error) {
    console.error(error)
  }
}

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body
  if (password !== confPassword)
    return res.status(400).json({ error: 'Password does not match' })
  const salt = await bcrypt.genSalt()
  const hashPassword = await bcrypt.hash(password, salt)
  try {
    User.create({
      name,
      email,
      password: hashPassword,
    })
    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    console.error(error)
  }
}

export const Login = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        email: req.body.email,
      },
    })
    const match = await bcrypt.compare(req.body.password, user[0].password)
    if (!match) return res.status(400).json({ message: 'Wrong Password' })
    const { id, name, email } = user[0]
    const accessToken = jwt.sign(
      { id, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '20s',
      }
    )
    const refreshToken = jwt.sign(
      { id, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '1d',
      }
    )
    await User.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          id: id,
        },
      }
    )
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.json({ accessToken })
  } catch (error) {
    res.status(404).json({ message: 'Email not found' })
  }
}

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) return res.sendStatus(204)
  const user = await User.findAll({
    where: {
      refresh_token: refreshToken,
    },
  })
  if (!user[0]) return res.sendStatus(204)
  const { id } = user[0]
  await User.update(
    { refresh_token: null },
    {
      where: { id },
    }
  )
  res.clearCookie('refreshToken')
  return res.sendStatus(200)
}
