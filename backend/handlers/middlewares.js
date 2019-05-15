exports.isLogged = (req, res, next) => {
  if(req.isAuthenticated()) next()
  res.status(401).json({ msg: 'Unauthorized' })
}