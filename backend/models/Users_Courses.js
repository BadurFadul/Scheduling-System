const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Users_Courses extends Model {}

Users_Courses.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      courseCode: {
        type: DataTypes.TEXT,
        references: { model: 'courses', key: 'code' },
      },   
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'users_courses'
})

module.exports = Users_Courses