const {DataTypes, Model} = require('sequelize')
const db = require('../db')

class GoogleUser extends Model {
    declare id: string
    declare email: string
    declare login: string
}

GoogleUser.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: db,
})

export {}