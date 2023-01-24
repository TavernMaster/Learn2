const {DataTypes, Model} = require('sequelize')
const db = require('../db')

class User extends Model {
    declare id: number
    declare email: string
    declare login: string
    declare password: string
    declare verified: boolean
}

User.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    verified: {
        type: DataTypes.BOOLEAN,
        default: false,
    }
}, {
    sequelize: db,
})

export {}