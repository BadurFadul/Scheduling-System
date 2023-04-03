const router = require('express').Router()
const { where } = require('sequelize')
const { Courses, Groups,Exams, Users } = require('../models')


// Get all courses
router.get('/', async (req, res) => {
    try {
      const courses = await Courses.findAll({ include: [{ model: Groups }, {model: Exams}, {model: Users}] })
      return res.status(200).json(courses)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  })

// Get a course by code
router.get('/:code', async (req, res) => {
  const { code } = req.params

  try {
    const course = await Courses.findOne({ where: { code }, include: [{ model: Groups }, {model: Exams}] })
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }
    return res.status(200).json(course)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
})

  router.post('/', async (req, res) => {
    const { code, name, sp, teacher, groupId } = req.body
  
    try {
      // Check if the groupId exists in the Groups table
      const group = await Groups.findByPk(groupId)
      if (!group) {
        return res.status(400).json({ message: 'Invalid groupId' })
      }
  
      // Create the course and associate it with the group and exams
      const course = await Courses.create({ code, name, sp, teacher,groupGroupId: groupId })
      return res.status(201).json(course)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  })

// Update an existing course
router.put('/:code', async (req, res) => {
  const {code} = req.params
  const { name, sp, teacher, groupId } = req.body
  try {
    const course = await Courses.findOne({where: {code}})
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }
    course.code = req.body.code
    course.name = name
    course.sp = sp
    course.teacher = teacher
    course.groupGroupId = groupId
    await course.save()
    res.json(course)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

//delete route
  router.delete('/:code', async (req, res) => {
    const courses = await Courses.findByPk(req.params.code)
    if (courses) {
      await courses.destroy()
    }
    res.status(204).end()
  })

  module.exports = router