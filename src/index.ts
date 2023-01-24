import {Request, Response} from 'express'

require('dotenv').config()
const sequelize = require('./db')
require('./models/User')
require('./models/Token')
require('./models/DiscordUser')
require('./models/GoogleUser')
const passport = require('passport')
require('./strategies/serializing')
require('./strategies/local')
require('./strategies/discord')
require('./strategies/google')

const express = require('express')
const session = require('express-session')
const app = express()

const auth = require('./router/auth')

const SequelizeStore = require("connect-session-sequelize")(session.Store)

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { sameSite: false, secure: false },
    store: new SequelizeStore({
        db: sequelize,
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.status(200).json('Доступ разрешён :)')
    } else {
        res.redirect('/auth')
    }
})

app.use('/auth', auth)

app.use((req: Request, res: Response) => {
   res.status(404).json('Страница не найдена :(')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Сервер запущен')
})