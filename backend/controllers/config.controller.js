const ConfigService = require('../services/config.service')
const asyncHandler = require('express-async-handler')

const apiGetConfig = async (req, res, next) => {
    let config = await ConfigService.getConfig()
    res.json(config)
}

const apiSaveConfig = asyncHandler(async (req, res, next) => {
    const newConfig = req.body
    let response = await ConfigService.saveConfig(newConfig)
    // if (response) {
        res.status(200).json({ msg: 'Settings saved!' })
    // } else next(new Error('asd'))
})

module.exports = { apiGetConfig, apiSaveConfig }
