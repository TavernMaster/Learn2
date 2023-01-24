import {Profile} from "passport";

const passport = require('passport')
const bcrypt = require('bcrypt')
const {Strategy: LocalStrategy} = require('passport-local')
const User = require('../db').models.User

type Done = (err: unknown | null, user: Profile | null) => {}

passport.use(new LocalStrategy({usernameField: 'email'},
    async function verify(email: string, password: string, done: Done) {
        try {

            console.log(email, password)

            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            if (!user) {
                return done(null, null)
            }

            bcrypt.compare(password, user.password, function(err: any, result: boolean) {
                if (err) console.log('Bcrypt error: ', err)
                if (result) {
                    user.provider = 'local'
                    return done(null, user)
                } else {
                    return done(null, null)
                }
            })

        } catch (e) {
            console.log('Local strategy error: ', e)
        }
    }
))

export {}