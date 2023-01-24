import {Request, Response} from "express"
const controller = require('../controller/auth')
const passport = require('passport')

const express = require('express')
const router = express()

router.get('/', controller.mainPage)

router.get('/logout', controller.logout)
router.post('/register', controller.register, passport.authenticate('local', {successRedirect: '/auth/email/verify'}))
router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/auth'}))
router.get('/email/verify', (req: Request, res: Response) => res.status(200).json('Вам было отправлено письмо на электронную почту. Для активации аккаунта, перейдите по ссылке в письме.'))
router.get('/verify', controller.verify)
router.get('/discord', passport.authenticate('discord'))
router.get('/discord/redirect', passport.authenticate('discord', {
    failureRedirect: '/auth'
}), function(req: Request, res: Response) {
    res.status(200).redirect('/')  // Successful auth
})
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/redirect', passport.authenticate('google', {
    failureRedirect: '/auth' }),
    (req: Request, res: Response) => {
    res.status(200).redirect('/')  // Successful auth
})

module.exports = router