import express from 'express'
import { verifyToken } from '../middleware/VerifyToken.js'
import {
  getUser,
  Register,
  Login,
  Logout,
} from '../controller/UserController.js'
import { refreshToken } from '../controller/RefreshToken.js'

const router = express.Router()

router.get('/user', verifyToken, getUser)
router.post('/register', Register)
router.post('/login', Login)
router.get('/token', refreshToken)
router.delete('/logout', Logout)

export default router
