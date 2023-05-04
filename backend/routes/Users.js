const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { Op } = require('sequelize');
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const { Users, Courses } = require('../models')

//Get users

router.get('/', async (req,res) => {
    try {
        const user = await Users.findAll({include: [{model: Courses}]})
        return res.status(200).json(user)
    }catch (err) {
        return res.status(500).json({message: 'Server error'})
    }   
})

// Get a user by userId
router.get('/:id', async (req, res) => {
    const { id } = req.params
  
    try {
      const user = await Users.findByPk(id, {include: [{model: Courses}]})
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      return res.status(200).json(user)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  })

  // Register user

  router.post('/register', async (req,res) => {
    const { name, username,email, password } = req.body

    if(password===undefined){
        return res.status(400).json({error: 'password must be given'})
      }
    
      if(password.length <4){
        return res.status(400).json({error: 'Password must be at least 3 characters'})
      }

      const existingUser = await Users.findOne({where: {username} })
      if (existingUser) {
        return res.status(400).json({
          error: 'username must be unique'
        })
      }

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const user = new Users({
        username,
        name,
        email,
        passwordHash
      })

      const saveduser = await user.save()
      return res.status(201).json(saveduser)
  })

  // Update an existing course
router.put('/:id', async (req, res) => {
  const {id} = req.params
  const { name, username, admin, email } = req.body
  try {
    const user = await Users.findOne({where: {id}})
    if (!user) {
      return res.status(404).json({ message: 'user not found' })
    }
    user.id = req.body.id
    user.name = name
    user.username = username
    user.admin = admin
    user.email = email
    await user.save()
    res.json(user)
  } catch (error) {
    res.status(500).send('Server Error')
  }
})



  //Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await Users.findOne({where: {username} })
    const passwordCorrect = user === null 
    ? false : 
    await bcrypt.compare(password, user.passwordHash)

    if (!user) {
        return res.status(401).json({
          error: 'invalid username'
        })
      }
  
      if (!passwordCorrect) {
        return res.status(401).json({
          error: 'invalid password'
        })
      }

      const userForToken = {
        username: user.username,
        id: user.id
      }

      // token expires in 60*60 seconds, that is, in one hour
      const token = jwt.sign(userForToken, process.env.SECRET,{expiresIn: 60*60})

      res
      .status(200)
      .send({token, username: user.username, name: user.name})
})

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: 'Badreldin.Fadul@outlook.com',
    pass: 'bador0787956948'
  }
})

function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

router.post('/forgot-password', async (req, res) => {
  try {
    const user = await Users.findOne({ where: { username: req.body.username } })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const code = generateRandomCode(5)
    user.resetPasswordCode = code
    user.resetPasswordExpires = Date.now() + 3600000 // 1 hour
    await user.save()

    const mailOptions = {
      to: user.email,
      from: 'Badreldin.Fadul@outlook.com',
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
             Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:
             Her is the code to reset your account:
             ${code}`
    }

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error sending email' })
      }
      res.status(200).json({ message: 'Password reset email sent' })
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
})

router.post('/reset-password', async (req, res) => {
  try {
    const { username, code, password } = req.body
    const user = await Users.findOne({
      where: {
        username,
        resetPasswordCode: code,
        resetPasswordExpires: {
          [Op.gt]: Date.now()
        }
      }
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired code' })
    }

    const newPassword = password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(newPassword, saltRounds)

    user.passwordHash = passwordHash
    user.resetPasswordCode = null
    user.resetPasswordExpires = null

    await user.save()

    res.status(200).json({ message: 'Password has been updated' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router

