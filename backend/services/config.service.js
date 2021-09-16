const Config = require('../models/config.model')
const asyncHandler = require('express-async-handler')

const getConfig = async () => {
    const config = await Config.findOne({})
    return config
}

const saveConfig = async newConfig => {
    const response = await Config.findByIdAndUpdate(newConfig._id, newConfig)
    console.log(response)
    return response
}

module.exports = { getConfig, saveConfig }
