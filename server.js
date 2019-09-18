const express = require('express')
const userRouter = require('./users/usersRoutes')

const server = express()

server.use(express.json())
server.use('/api', userRouter)


module.exports = server