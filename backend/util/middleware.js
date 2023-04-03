const Session = require('../models/sessions')
const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')


const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      } catch{
        return res.status(401).json({ error: 'token invalid' })
      }
    }  else {
      return res.status(401).json({ error: 'token missing' })
    }
    next()
  }

const tokenValidator = async (req, res, next) => {
  const authorization = req.get('authorization')
  const token = authorization.substring(7)

  const session = await Session.findOne({
    where: {
      token: token,
    }
  })
    if (session.valid) {
      req.session = session
      next()
    } else {
      res.status(403).json({ error: "Session expired, please log in again" });
    }

}

module.exports = { tokenValidator, tokenExtractor }