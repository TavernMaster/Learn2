import {Request, Response} from "express"
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const User = require('../db').models.User
const Token = require('../db').models.Token

const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_LOG,
        pass: process.env.EMAIL_PASS,
    },
})

class Auth {
    mainPage(req: Request, res: Response) {
        res.status(200).json('Выберите способ авторизации')
    }

    async register(req: Request, res: Response, next: any) {
        try {
            const email = req.body.email
            const password = req.body.password

            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            if (user) {
                res.status(401).json('Пользователь с такой почтой уже существует')
            } else {
                bcrypt.hash(password, 10).then(async (hash: string) => {
                    const newUser = await User.create({
                        email: email,
                        password: hash
                    })

                    const token = crypto.randomBytes(20).toString('hex')

                    console.log(token)
                    await Token.create({
                        id: newUser.id,
                        token: token
                    })

                    await transporter.sendMail({
                        from: 'Deimos Corps 👻 <dimasamusch@yandex.ru>', // sender address
                        to: email,
                        subject: "Подтверждение регистрации", // Subject line
                        html: `Для подтверждения регистрации нажмите <a href="http://94.19.156.115:3000/auth/verify/?token=${token}" onMouseOver="window.status=’сокращенная ссылка’; return true" onMouseOut="window.status=»; return true">сюда</a>`
                    })
                    next()
                })
            }
        } catch (e) {
            console.log('Ошибка регистрации: ', e)
        }
    }

    async verify(req: Request, res: Response, next: any) {
        const token = req.query.token

        const tokenDb = await Token.findOne({
            where: {
                token: token
            }
        })

        if (tokenDb) {
            const user = await User.findOne({
                where:{
                id: tokenDb.id
                }
            })

            user.verified = true
            user.save()

            tokenDb.destroy()
            res.status(200).json('Электронная почта успешно подтверждена')
        } else {
            next()
        }
    }

    logout(req: any, res: Response) {
        req.session.destroy(() => {
            res.redirect('/auth')
        })
    }
}

const controller = new Auth()
module.exports = controller