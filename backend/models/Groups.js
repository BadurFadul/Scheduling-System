const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Groups extends Model {}

Groups.init({
    groupId: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
      },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'groups'
})

module.exports = Groups