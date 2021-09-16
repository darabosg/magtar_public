const mongoose = require('mongoose')

const uri = process.env.MONGO_URI

const connectDB = async () => {
    await mongoose
        .connect(uri, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then(() => console.log('Connected Successfully'))
        .catch(err => console.log('not connected', err))
}

module.exports = connectDB
