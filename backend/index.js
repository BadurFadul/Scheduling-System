const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const { Sequelize } = require('sequelize');
const cors = require('cors')
const CoursesRouter = require('./routes/Courses')
const ExamsRouter = require('./routes/Exams')
const GroupRouter = require('./routes/Groups')
const UsersRouter = require('./routes/Users') 
const Users_CoursesRouter = require('./routes/Users_Courses')

app.use(cors())
app.use(express.json())

app.use('/groups', GroupRouter)
app.use('/courses', CoursesRouter)
app.use('/exams', ExamsRouter)
app.use('/users', UsersRouter)
app.use('/userscourses', Users_CoursesRouter)


const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  }
  
  start()