const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Users extends Model {}

Users.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique:true
    },
    passwordHash: {
        type: DataTypes.STRING
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
},{
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'users'
  })

module.exports = Users