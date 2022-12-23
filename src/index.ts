import {Request, Response} from 'express'

const express = require('express')
const app = express()
require('dotenv').config()

app.use('/', (req: Request, res: Response) => {
    res.status(404).json('Страница не найдена')
})

app.listen(process.env.PORT, () => {
    console.log('Сервер запущен')
})