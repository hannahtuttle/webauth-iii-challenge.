const jwt = require('jsonwebtoken')
const secret = require('../config/secrets.js')

module.exports = function restricted(req, res, next) {
    const token = req.headers.authorization

    if(token){
        jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
            if(error){
                //token expired or is invalid
                res.status(401).json({ message: 'Invalid Credentials, you shall not pass' });
              }else{
                //token is good
                // maybe add the user to the request object
                req.user = {username: decodedToken.username}
                next()
              }  
        })
    }else {
        res.status(401).json({message: 'No credentials provided, You shall not pass'})
    }
}