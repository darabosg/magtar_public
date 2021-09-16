const Instrument = require('../models/instrument.model')

const createInstrument = async newInstrument => {
    let nextId = await Instrument.find({}).sort({ id: -1 }).limit(1)
    nextId = nextId.length !== 0 ? nextId[0].id + 1 : 1

    newInstrument.id = nextId
    newInstrument.instrument.createdAt = new Date().toString()
    if (!newInstrument.isOrder) {
        newInstrument.order = {}
    }
    const created = await new Instrument(newInstrument).save()
    return created
}

const getAllInstruments = async isOrder => {
    let query
    if (isOrder === undefined) {
        query = {}
    } else if (isOrder === 'false') {
        query = { isOrder:false }
    } else {
        query = { isOrder: true }
    }
    const instruments = await Instrument.find(query).sort({ id: -1 })
    return instruments
}

const deleteInstrument = async _id => {
    const deleted = await Instrument.deleteOne({ _id: _id })
    return deleted
}

const updateInstrument = async toUpdate => {
    const toUpdateId = toUpdate._id
    const response = await Instrument.findByIdAndUpdate(toUpdateId, toUpdate, {
        new: true
    })
    // if (!toUpdate.isOrder) {
    //     response.order = undefined
    // }
    // response.save()
    return response
}

const getSummary = async () => {
    const response = await Instrument.aggregate([
        {
            $match: {
                $or: [
                    {
                        isOrder: false
                    },
                    {
                      'order.delivered': false
                    },
                ],
            },
        },
        {
            $group: {
                _id: '$instrument.scale',
                orderBp: {
                    $sum: {
                        $cond: [
                            {
                                $and: [
                                    {
                                        $eq: ['$isOrder', true],
                                    },
                                    {
                                        $eq: ['$instrument.location', 'BP'],
                                    },
                                ],
                            },
                            1,
                            0,
                        ],
                    },
                },
                orderGyor: {
                    $sum: {
                        $cond: [
                            {
                                $and: [
                                    {
                                        $eq: ['$isOrder', true],
                                    },
                                    {
                                        $eq: ['$instrument.location', 'Győr'],
                                    },
                                ],
                            },
                            1,
                            0,
                        ],
                    },
                },
                stockBp: {
                    $sum: {
                        $cond: [
                            {
                                $and: [
                                    {
                                        $eq: ['$isOrder', false],
                                    },
                                    {
                                        $eq: ['$instrument.location', 'BP'],
                                    },
                                ],
                            },
                            1,
                            0,
                        ],
                    },
                },
                stockGyor: {
                    $sum: {
                        $cond: [
                            {
                                $and: [
                                    {
                                        $eq: ['$isOrder', false],
                                    },
                                    {
                                        $eq: ['$instrument.location', 'Győr'],
                                    },
                                ],
                            },
                            1,
                            0,
                        ],
                    },
                },
            },
        },
    ])

    return response
}

module.exports = {
    createInstrument,
    getAllInstruments,
    deleteInstrument,
    updateInstrument,
    getSummary,
}
