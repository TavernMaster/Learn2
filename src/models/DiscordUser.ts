const {DataTypes, Model} = require('sequelize')
const db = require('../db')

class DiscordUser extends Model {
    declare id: number
    declare email: string
    declare login: string
    declare password: string
}

DiscordUser.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
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