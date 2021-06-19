const express = require('express'),
      passport = require('./passport'),
      mongoose = require('mongoose'),
      router = express.Router(),
      userSchema = require('../schemas/user'),
      User = mongoose.model('User', userSchema)


router.get('/get_user', passport.authenticate('check', {session: false}), (req, res, next)=>{
  res.send(req.user)
})

router.post('/signup', (req, res, next) => {
  passport.authenticate('signup', {session: false}, (err, user, info) => {
    if (err) {
      res.sendStatus(400)
    } else {
      res.send()
    }
  }) (req, res)
})

router.post('/signin', (req, res, next) => {
  passport.authenticate('signin', {session: false}, (err, user, info) => {
    if (err || !user) {
      res.sendStatus(400)
    } else {
      res.send({
        user: user,
        token: info
      })
    }
  }) (req, res)
})

router.post('/reset_pwd', (req, res, next) => {
  User.findOne({email: req.body.email}).select('+password').exec((err, user) => {
    if (err || !user) {
      res.sendStatus(400)
    } else {
      user.password = req.body.password
      user.save(err => {
        err ? res.sendStatus(400) : res.send()
      })
    }
  })
})

module.exports = router
