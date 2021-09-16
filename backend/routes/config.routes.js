const express = require('express')
const configRouter = express.Router()
const ConfigController = require('../controllers/config.controller')
const authMiddleware = require('../middlewares/auth.middleware')

// instrumentRouter.post('/', InstrumentController.xxx)

configRouter.get('/', authMiddleware, ConfigController.apiGetConfig)
configRouter.post('/', authMiddleware, ConfigController.apiSaveConfig)

module.exports = configRouter
