const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const data = require('./usersModels.js')
const restricted = require('../auth/authRestricted.js')
const Token = require('../auth/authToken.js')
const secret = require('../config/secrets.js')

const router = express.Router()

router.get('/', (req, res) => {
    res.send("testing Port!");
  });

router.post('/register', (req, res) => {
    const {username , password} = req.body

    const hash = bcrypt.hashSync(password, 10)

    data.add({username, password: hash})
    .then(save => {
        res.status(201).json(save)
    })
    .catch(err => {
        res.status(500).send(err)
    })

})

router.post('/login', (req, res) => {
    const {username, password} = req.body
    //console.log('body', req.body)
    data.findby({username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            //console.log('user', user)
            const token = Token.generateToken(user)
            console.log('token',token)
            res.status(200).json({user: user.username, token: token})
        }else {
            res.status(401).json({message: 'invalid credentials'})
        }
    })
    .catch(err => {
        //res.send(err)
        console.log(err)
        res.status(500).send(err)
    })

})

router.get('/users',restricted, (req, res) => {

    data.find()
    .then(users => {
        res.status(200).json({users, loggedInUser: req.user.username})
    })
    .catch(err => {
        res.status(500).send(err)
    })

})

// function generateToken(user) {
//     const payload = {
//         username: user.username 
//     }
//     const options = {
//        expiresIn: '1d' 
//     }
//     return jwt.sign(payload, secret.jwtSecret, options)
// }


module.exports = router;