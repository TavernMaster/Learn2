const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOSTNAME,
    dialect: process.env.DB_TYPE,
    logging: process.env.DB_LOG == 'true' ? console.log : false,
    timezone: '+00:00',
    define: {
        timestamps: false
    }
})

module.exports = sequelize

async function init() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }

    try {
        await sequelize.sync({alter: true})
    } catch (e) {
        console.error(e)
    }
}

init()