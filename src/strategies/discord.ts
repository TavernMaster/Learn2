import {Profile} from "passport-discord";

const passport = require('passport')
const {Strategy: Discord} = require('passport-discord')
const DiscordUser = require('../db').models.DiscordUser

type Done = (err: unknown | null, user: Profile | null) => {}

passport.use(
    new Discord({
            clientID: '1055786890533548072',
            clientSecret: 'j35BwwhgMUhJxFlRktVIkgs6FGLoR9C1',
            callbackURL: 'http://94.19.156.115:3000/auth/discord/redirect',
            scope: ['identify', 'email']
        },
        async function (accessToken: string, refreshToken: string, profile: Profile, done: Done) {
            try {
                const user = await DiscordUser.findOne({
                    where: {
                        id: profile.id
                    }
                })
                if (user) {
                    user.provider = 'discord'
                    return done(null, user)
                } else {
                    const newUser = await DiscordUser.create({
                        id: profile.id,
                        login: profile.username,
                        email: profile.email,
                    })
                    newUser.provider = 'discord'
                    return done(null, newUser)
                }
            } catch (err: unknown) {
                console.log('Discord strategy error: ', err)
                return done(err, null)
            }
        }
    )
)