const jwt = require('jsonwebtoken')
const secret = require('../config/secrets.js')

function generateToken(user) {
    const payload = {
        username: user.username 
    }
    const options = {
       expiresIn: '1d' 
    }
    return jwt.sign(payload, secret.jwtSecret, options)
}

module.exports = {
    generateToken
}