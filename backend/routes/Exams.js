const express = require('express')
const router = express.Router()
const { Exams, Courses } = require('../models')

router.get('/', async (req, res) => {
    try {
      const exams = await Exams.findAll({ include: [Courses] })
      return res.status(200).json(exams)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  })

  // Get an exam by id
router.get('/:id', async (req, res) => {
    const { id } = req.params
  
    try {
      const exam = await Exams.findByPk(id, { include: [Courses] })
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found' })
      }
      return res.status(200).json(exam)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  })

  // Create an exam
router.post('/', async (req, res) => {
    const { date, courseId } = req.body
  
    try {
      const course = await Courses.findByPk(courseId)
  
      if (!course) {
        return res.status(400).json({ message: 'Invalid courseId' })
      }
      const exam = await Exams.create({ date, courseCode:courseId })
      return res.status(201).json(exam)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  })

  // Update an exam by id
  router.put('/:id', async (req, res) => {
    const {id} = req.params
    const { date, courseId } = req.body
    try {
      const exam = await Exams.findOne({where: {id}})
      if (!exam) {
        return res.status(404).json({ message: 'Exams not found' })
      }
      exam.date = date
      exam.courseCode = courseId
      await exam.save()
      res.json(exam)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
  })

  // Delete an exam by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params
  
    try {
      const exam = await Exams.findByPk(id)
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found' })
      }
      await exam.destroy()
      return res.status(204).send()
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  })
  
  module.exports = router
