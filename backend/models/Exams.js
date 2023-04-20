const { Model, DataTypes, Op } = require('sequelize')
const { sequelize } = require('../util/db')

class Exams extends Model {}

Exams.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    date: {
        type: DataTypes.DATE,
        allowNull:false
    }
},{
    sequelize,
    underscored:true,
    timestamps: true,
    modelName: 'exams',
    /*hooks: {
        async beforeCreate(exam) {
          // Find all exams for the same course that occur during the same week as the new exam
          const exams = await Exams.findAll({
            where: {
              courseId: exam.courseId,
              date: {
                [Op.between]: [
                  addDays(exam.date, -6),
                  addDays(exam.date, 6),
                ],
              },
            },
          })
  
          // Check if the group has more than two exams during the same week
          const examCount = exams.filter((e) => e.groupId === exam.groupId).length
          if (examCount >= 2) {
            throw new Error('Group has already two exams this week')
          }
  
          // Check if the group has an exam on the same day as the new exam
          const sameDayExam = exams.find((e) =>
            isSameDay(new Date(e.date), new Date(exam.date))
          )
          if (sameDayExam) {
            throw new Error('Group has already an exam on the same day')
          }
        },
      },*/
})

module.exports = Exams