import {Profile} from "passport"

const passport = require("passport")
const db = require('../db')

interface IUser {
    id: number | string,
    provider: string
}

passport.serializeUser((user: Profile, done: (err: unknown | null, user: IUser) => {}) => {
    console.log('Serializing: ', user)
    return done(null, {id: user.id, provider: user.provider})
})

passport.deserializeUser(async (user: IUser, done: (err: unknown | null, user: Profile | null) => {}) => {
    try {
        console.log('Deserializing data: ', user)
        if (!user.provider) return done(null, null)

        let userModel
        switch (user.provider) {
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
                id: user.id
            }
        })
        if (userDB) {
            console.log('Deserializing: ', userDB.dataValues)
            return done(null, userDB)
        } else {
            console.log('Deserializing: false')
            return done(null, null)
        }

    } catch (e) {
        console.log('Deserialization error: ', e)
        return done(e, null)
    }
})

export {}