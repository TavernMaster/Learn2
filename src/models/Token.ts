const {DataTypes, Model} = require('sequelize')
const db = require('../db')

class Token extends Model {
    declare id: string
    declare token: string
}

Token.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: db,
})

export {}