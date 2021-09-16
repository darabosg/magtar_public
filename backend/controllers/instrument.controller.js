const InstrumentService = require('../services/instrument.service')
const asyncHandler = require('express-async-handler')

const apiCreateInstrument = asyncHandler(async (req, res) => {
    const instrument = req.body
    // console.log(instrument)
    const created = await InstrumentService.createInstrument(instrument)
    res.json({ instrument: created, msg: 'New instrument created!' })
})

const apiGetAllInstruments = asyncHandler(async (req, res) => {
    const isOrder = req.query.order
    const instruments = await InstrumentService.getAllInstruments(isOrder)
    res.json(instruments)
})

const apiDeleteInstrument = asyncHandler(async (req, res) => {
    const idToDelete = req.body._id
    const response = await InstrumentService.deleteInstrument(idToDelete)
    res.status(200).json({ msg: 'Instrument deleted!' })
})

const apiUpdateInstrument = asyncHandler(async (req, res) => {
    const toUpdate = req.body
    const response = await InstrumentService.updateInstrument(toUpdate)
    res.json(response)
})

const apiGetSummary = asyncHandler(async (req, res) => {
    const response = await InstrumentService.getSummary()
    res.json(response)
})

module.exports = {
    apiCreateInstrument,
    apiGetAllInstruments,
    apiDeleteInstrument,
    apiUpdateInstrument,
    apiGetSummary,
}
