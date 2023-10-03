const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://siddjain:EHO5OlsRNscV7WU6@cluster0.88lgmwp.mongodb.net/?retryWrites=true&w=majority'
    )

    console.log('MongoDB connected')
  } catch (e) {
    console.log(e)
  }
}

module.exports = connectDB
