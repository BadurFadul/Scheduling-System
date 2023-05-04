const express = require('express')
const router = express.Router()
const { Groups, Courses } = require('../models')
const {tokenExtractor} = require('../util/middleware')



// Get all groups
router.get('/', async (req, res) => {
    try {
      const groups = await Groups.findAll({ include: [Courses] })
      return res.status(200).json(groups)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  })

  // Get a group by groupId
router.get('/:groupId', async (req, res) => {
    const { groupId } = req.params
    try {
      const group = await Groups.findByPk(groupId, { include: [Courses] })
      if (!group) {
        return res.status(404).json({ message: 'Group not found' })
      }
      return res.status(200).json(group)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  })

  // Create a group
router.post('/', async (req, res) => {
    const { name } = req.body
    try {
      const group = await Groups.create({ name })
      return res.status(201).json(group)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  })

  //update a group
  router.put('/:groupId', async (req,res) => {
    const {groupId} = req.params
    const {name} = req.body
    try{
        const group = await Groups.findByPk(groupId)
        if (!group) {
            return res.status(404).json({ message: 'Group not found' })
          }
          await group.update({ name })
          return res.status(200).json(group)
    } catch (err) {
        return res.status(500).json({ message: 'Server error' })
      }
  })

  // Delete a group by groupId
router.delete('/:groupId', async (req, res) => {
    const { groupId } = req.params
  
    try {
      const group = await Groups.findByPk(groupId)
      if (!group) {
        return res.status(404).json({ message: 'Group not found' })
      }
      await group.destroy()
      return res.status(204).send()
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  })
  
  module.exports = router