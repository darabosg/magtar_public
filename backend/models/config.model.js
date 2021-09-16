const mongoose = require('mongoose')

const configSchema = new mongoose.Schema({
    scales: {
        type: Array,
        required: true,
    },
    materials: {
        type: Array,
        required: true,
    },
    makers: {
        type: Array,
        required: true,
    },
    packages: {
        type: Array,
        required: true,
    },
})

module.exports = mongoose.model('config', configSchema,'config')
