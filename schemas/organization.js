const mongoose = require('mongoose')

const organizationSchema = new mongoose.Schema({
  name: String,
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true})


module.exports = userSchema