const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Courses extends Model {}

Courses.init({
    code: {
        type:DataTypes.TEXT,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    sp: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    teacher: {
        type: DataTypes.TEXT,
        allowNull:false
    }
}, {
    sequelize,
    underscored:true,
    timestamps: false,
    modelName: 'courses'
})

module.exports = Courses