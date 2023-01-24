const passport = require('passport')
const {Strategy: GoogleStrategy} = require('passport-google-oauth20')
const GoogleUser = require('../db').models.GoogleUser

passport.use(new GoogleStrategy({
        clientID: '26553528019-hdloigc48g40kflquvudhfngqgld5lhm.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:3000/auth/google/redirect'
    },
    async function (accessToken: string, refreshToken: string, profile: any, done: any) {
        try {
            console.log(profile)
            const user = await GoogleUser.findOne({
                where: {
                    id: profile.id
                }
            })
            if (user) {
                user.provider = 'google'
                return done(null, user)
            } else {
                const newUser = await GoogleUser.create({
                    id: profile.id,
                    login: profile.displayName,
                    email: profile.emails[0].value,
                })
                newUser.provider = 'google'
                return done(null, newUser)
            }
        } catch (err) {
            console.log('Google strategy error: ', err)
        }
    }))

export {}