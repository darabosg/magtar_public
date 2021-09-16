require('dotenv').config()
const express = require('express')
const cors = require('cors')
// const authMiddleware = require('./middlewares/auth.middleware')
const errorMiddleware = require('./middlewares/error.middleware')
const app = express()


const userRouter = require('./routes/user.routes')
const instrumentRouter = require('./routes/instrument.routes')
const configRouter = require('./routes/config.routes')


app.use(express.json())
app.use(
    cors(
        {
        origin: process.env.CLIENT_URL,
    }
    )
)



app.use('/api/user', userRouter)
app.use('/api/instrument', instrumentRouter)
app.use('/api/config', configRouter)

app.use(errorMiddleware)





module.exports = app
