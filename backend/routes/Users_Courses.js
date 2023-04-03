const router = require('express').Router()
const { where } = require('sequelize')
const { Users_Courses, Users, Courses } = require('../models')


// Get all courses
router.get('/', async (req, res) => {
  try {
    const userscourses = await Users_Courses.findAll()
    return res.status(200).json(userscourses)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
})

router.post('/', async (req, res) => {
  
  try{
      const usercourses = await Users_Courses.create({
          ...req.body,
          user_id: req.body.userId,
          course_code: req.body.courseCode
      });
      res.json(usercourses)
  }catch (error) {
      return res.status(400).send({ error })
  }
})

  // Delete an usercourses by id
  router.delete('/:id', async (req, res) => {
    const { id } = req.params
  
    try {
      const usercourses = await Users_Courses.findByPk(id)
      if (!usercourses) {
        return res.status(404).json({ message: 'usercourses not found' })
      }
      await usercourses.destroy()
      return res.status(204).send()
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  })

    // Put an usercourses by id
    router.put('/:id', async (req, res) => {
      const { id } = req.params
      const {userId, courseCode} = req.body
    
      try {
        const usercourses = await Users_Courses.findByPk(id)
        if (!usercourses) {
          return res.status(404).json({ message: 'usercourses not found' })
        }
        usercourses.userId = userId
        usercourses.courseCode = courseCode
        await usercourses.save()
        return res.status(204).send()
      } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server error' })
      }
    })

  module.exports = router