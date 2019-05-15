const router = require('express').Router()
const User = require('../models/User')
const passport = require('passport')
const { isLogged } = require('../handlers/middlewares')

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) return res.status(500).json({ err, infoErr })
    if (!user) return res.status(401).json({ msg: "This user doesn't exist" })
    req.logIn(user, err => {
      if(err) return res.status(500).json(err)
      res.status(200).json({ email: user.email, name: user.name, campus: user.campus, course: user.course })
    })
  })(req, res, next)
})

router.post('/signup', (req, res, next) => {
  User.register(req.body, req.body.password)
    .then(user => res.status(201).json(user))
    .catch(err => res.json(err))
})

router.post('/upload', (req, res, next) => {

})

router.post('/edit', (req, res, next) => {
  const { _id } = req.body
  User.findByIdAndUpdate(_id, req.body, { new: true })
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json(err))
})

router.get('/logout', (req, res, next) => {
  req.logOut()
  req.status(200).json({ msg: 'logOut backend'})
})

router.get('/loggedin', isLogged, (req, res, next)=> {
  req.status(200).json(req.user)
})

module.exports = router
