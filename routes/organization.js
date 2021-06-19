const express = require('express'),
      passport = require('./passport'),
      mongoose = require('mongoose'),
      router = express.Router(),
      userSchema = require('../schemas/user'),
      User = mongoose.model('User', userSchema)

router.post('create_new', passport.authenticate('check', {session: false}), (req, res, next) => {
  console.log(req.body.name)
  res.send()
})

module.exports = router