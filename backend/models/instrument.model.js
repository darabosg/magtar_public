const mongoose = require('mongoose')

const instrumentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    instrument: {
        scale: {
            type: String,
            required: true,
        },
        material: {
            type: String,
            required: true,
        },
        customisation: {
            type: String,
        },
        isMutant: {
            type: Boolean,
            required: true,
            default: false,
        },
        hasBottom: {
            type: Boolean,
            required: true,
            default: false,
        },
        instrumentId: {
            type: String,
        },
        createdBy: {
            type: String,
            required: true,
        },
        location: {
            type: String,
        },
        createdAt: {
            type: String,
            required: true,
        },
    },

    isOrder: { type: Boolean, required: true, default: false },

    order: {
        name: {
            type: String,
        },
        contact: {
            type: String,
        },
        ETA: {
            type: Date,
        },
        deadline: {
            type: Date,
        },
        package: {
            type: String,
        },
        case: {
            type: String,
        },
        delivered: {
            type: Boolean,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
    },

    process: {
        tuner: { type: String, default: '' },
        top: {
            draw: {
                status: {
                    type: Boolean,
                    default: false,
                },
                by: {
                    type: String,
                },
                at: {
                    type: Date,
                },
            },
            dimple: {
                status: {
                    type: Boolean,
                    default: false,
                },
                by: {
                    type: String,
                },
                at: {
                    type: Date,
                },
            },
            shape: {
                status: {
                    type: Boolean,
                    default: false,
                },
                by: {
                    type: String,
                },
                at: {
                    type: Date,
                },
            },
            tune: {
                status: {
                    type: Boolean,
                    default: false,
                },
                by: {
                    type: String,
                },
                at: {
                    type: Date,
                },
            },
        },
        bottom: {
            draw: {
                status: {
                    type: Boolean,
                    default: false,
                },
                by: {
                    type: String,
                },
                at: {
                    type: Date,
                },
            },
            dimple: {
                status: {
                    type: Boolean,
                    default: false,
                },
                by: {
                    type: String,
                },
                at: {
                    type: Date,
                },
            },
            shape: {
                status: {
                    type: Boolean,
                    default: false,
                },
                by: {
                    type: String,
                },
                at: {
                    type: Date,
                },
            },
            tune: {
                status: {
                    type: Boolean,
                    default: false,
                },
                by: {
                    type: String,
                },
                at: {
                    type: Date,
                },
            },
        },
        whole: {
            glue: {
                status: {
                    type: Boolean,
                    default: false,
                },
                by: {
                    type: String,
                },
                at: {
                    type: Date,
                },
            },
            flex: {
                status: {
                    type: Boolean,
                    default: false,
                },
                by: {
                    type: String,
                },
                at: {
                    type: Date,
                },
            },
            finetune: {
                status: {
                    type: Boolean,
                    default: false,
                },
                by: {
                    type: String,
                },
                at: {
                    type: Date,
                },
            },
            nano: {
                status: {
                    type: Boolean,
                    default: false,
                },
                by: {
                    type: String,
                },
                at: {
                    type: Date,
                },
            },
            finish: {
                status: {
                    type: Boolean,
                    default: false,
                },
                by: {
                    type: String,
                },
                at: {
                    type: Date,
                },
            },
        },
    },
})

module.exports = mongoose.model('instrument', instrumentSchema)
