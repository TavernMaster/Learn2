const passport = require('passport')
const bcrypt = require('bcrypt')
const {Strategy: LocalStrategy} = require('passport-local')
const User = require('../db').models.User

passport.use(new LocalStrategy({usernameField: 'email'},
    async function verify(email: string, password: string, done: any) {
        try {

            console.log(email, password)

            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            if (!user) {
                return done(null, false)
            }

            bcrypt.compare(password, user.password, function(err: any, result: boolean) {
                if (err) console.log('Bcrypt error: ', err)
                if (result) {
                    user.provider = 'local'
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            })

        } catch (e) {
            console.log('Local strategy error: ', e)
        }
    }
))

export {}