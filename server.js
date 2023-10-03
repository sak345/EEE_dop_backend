require('dotenv').config({ path: './config.env' })
require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))
app.use('/api/paper', require('./routes/paper'))
app.use('/api/admin', require('./routes/admin'))

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
)

console.log('hello')
process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`)
  server.close(() => process.exit(1))
})
