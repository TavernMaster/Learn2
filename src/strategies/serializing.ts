const passport = require("passport")
const db = require('../db')

passport.serializeUser((user: any, done: any) => {
    console.log('Serializing: ', user.dataValues)
    return done(null, {id: user.id, provider: user.provider})
})

passport.deserializeUser(async (data: any, done: any) => {
    try {
        console.log('Deserializing data: ', data)
        if (!data.provider) return done(null, false)

        let userModel
        switch (data.provider) {
            case 'local':
                userModel = db.models.User
                break

            case 'discord':
                userModel = db.models.DiscordUser
                break

            case 'google':
                userModel = db.models.GoogleUser
                break
        }

        const userDB = await userModel.findOne({
            where: {
                id: data.id
            }
        })
        if (userDB) {
            console.log('Deserializing: ', userDB.dataValues)
            return done(null, userDB)
        } else {
            console.log('Deserializing: false')
            return done(null, false)
        }

    } catch (e) {
        console.log('Deserialization error: ', e)
        return done(e)
    }
})

export {}