const express = require('express')
const userRouter = express.Router()
const UserController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

// userRouter.get('/', UserController.xxx)
userRouter.post('/login', UserController.apiAuthUser)
userRouter.get('/', authMiddleware, UserController.apiGetAllUsers)
userRouter.post('/', authMiddleware, UserController.apiAddUser)
userRouter.delete('/',authMiddleware, UserController.apiDeleteUser)

module.exports = userRouter
 