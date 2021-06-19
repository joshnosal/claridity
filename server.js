if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Test Script

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user.js')
const organizationRouter = require('./routes/organization')

const PORT = process.env.PORT || 4001
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/user', userRouter)
app.use('/org', organizationRouter)

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
let db = mongoose.connection
db.on('connected', ()=>{
  app.listen(PORT, ()=>{
    console.log(`Server listening at port ${PORT}.`)
  })
})