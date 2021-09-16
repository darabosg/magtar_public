require('dotenv').config()
const connectDB = require('./dbconnect')
const app = require('./app')
const port = process.env.PORT || 8000

connectDB()

app.listen(port, () => {
    console.log(`INFO: Started Express app on port: ${port}`)
})
