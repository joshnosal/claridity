const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {type: String, select: false},
  // projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
}, {timestamps: true})

userSchema.pre('save', function(next){
  this.email = this.email.toLowerCase()
  if (this.isNew || this.isModified('password')) {
    const doc = this
    bcrypt.hash(doc.password, saltRounds, function(err, hashedPassword){
      if (err) return next(err)
      doc.password = hashedPassword
      next()
    })
  } else {
    next()
  }
})

module.exports = userSchema