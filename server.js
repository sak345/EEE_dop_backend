require('dotenv').config({ path: './config.env' })
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db')
const cors = require('cors')

connectDB()

const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json())
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }
}));

app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))
app.use('/api/paper', require('./routes/paper'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/journals', require('./routes/Journal'));
app.use('/api/users', require('./routes/User'));
app.use('/api/awards', require('./routes/awards'))

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
)

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`)
  server.close(() => process.exit(1))
})
