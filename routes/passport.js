const passport = require('passport'),
      mongoose = require('mongoose'),
      userSchema = require('../schemas/user'),
      JWTstrategy = require('passport-jwt').Strategy,
      ExtractJWT = require('passport-jwt').ExtractJwt,
      User = mongoose.model('User', userSchema),
      localStrategy = require('passport-local').Strategy,
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken')

passport.use('check', new JWTstrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.COOKIE_SECRET
}, function(token, done){
  User.findById(token.id, (err, user)=>{
    user ? done(null, user) : done(err, false)
  })
}))

passport.use('signup', new localStrategy({
  passReqToCallback: true,
  usernameField: 'email'
}, (req, em, pass, done) => {
  let email = req.body.email.toLowerCase(),
      password = req.body.password,
      name = req.body.name
    
  User.find({email: email}, (error, users) => {
    if (error) return done(true)
    if (users.length) return done(true)
    let user = new User({
      email: email,
      password: password,
      name: name
    })
    user.save((err, doc)=>done(err, doc))
  })
}))

passport.use('signin', new localStrategy({
  passReqToCallback: true,
  usernameField: 'email'
}, (req, em, pass, done) => {
  let email = req.body.email.toLowerCase(),
      password = req.body.password
  
  User.findOne({email: email}).select('+password').exec((err, user) => {
    if (err || !user) {
      done(true)
    } else {
      bcrypt.compare(password, user.password, function(err, same){
        if (same) {
          let duration = req.body.remember ? '1d' : '1h'
          const token = jwt.sign({id: user._id}, process.env.COOKIE_SECRET, {expiresIn: duration})
          done(null, user, token)
        } else {
          done(true)
        }
      })
    }
  })
}))

module.exports = passport