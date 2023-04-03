const Groups = require('./Groups')
const Courses = require('./Courses')
const Exams = require('./Exams')
const Users = require('./Users')
const Users_Courses = require('./Users_Courses')


// One to many relationship
Groups.hasMany(Courses)
Courses.belongsTo(Groups)

// One to many relationship 
Courses.hasMany(Exams)
Exams.belongsTo(Courses)

//many to many relationship
Users.belongsToMany(Courses, {through: Users_Courses})
Courses.belongsToMany(Users, { through: Users_Courses})

// Ensure Groups table is created before Courses table

  Groups.sync({ alter: true })
  Courses.sync({ alter: true }) 
  Users.sync({ alter: true }) 
  Exams.sync({ alter: true })
  Users_Courses.sync({ alter: true })

module.exports = {
    Courses, Exams, Groups,Users, Users_Courses
}

