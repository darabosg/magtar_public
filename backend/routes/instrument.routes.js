const express = require('express')
const instrumentRouter = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const InstrumentController = require('../controllers/instrument.controller')

instrumentRouter.post(
    '/',
    authMiddleware,
    InstrumentController.apiCreateInstrument
)
instrumentRouter.get(
    '/',
    authMiddleware,
    InstrumentController.apiGetAllInstruments
)
instrumentRouter.delete(
    '/',
    authMiddleware,
    InstrumentController.apiDeleteInstrument
)
instrumentRouter.put(
    '/',
    authMiddleware,
    InstrumentController.apiUpdateInstrument
)

instrumentRouter.get(
    '/summary',
    authMiddleware,
    InstrumentController.apiGetSummary
)

module.exports = instrumentRouter
