const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
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
    const { name, username, password } = req.body

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
        passwordHash
      })

      const saveduser = await user.save()
      return res.status(201).json(saveduser)
  })

  // Update an existing course
router.put('/:id', async (req, res) => {
  const {id} = req.params
  const { name, username, admin } = req.body
  try {
    const user = await Users.findOne({where: {id}})
    if (!user) {
      return res.status(404).json({ message: 'user not found' })
    }
    user.id = req.body.id
    user.name = name
    user.username = username
    user.admin = admin
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

module.exports = router

