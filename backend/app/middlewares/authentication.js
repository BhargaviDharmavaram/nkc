const jwt = require('jsonwebtoken')

const authenticateUser = async (req,res,next) => {
    let token = req.headers['x-auth']
    if(token){
        token = token.split(' ')[1]
        try{
            const tokenVerify = jwt.verify(token, process.env.JWT_SECRET)
            console.log('tokenVerify', tokenVerify)// tokenVerify { id: '64d7c0e48cabac8ca2d7c213', role: 'pg_admin', iat: 1691949323 }
            req.user = {
                id : tokenVerify.id,
                //role : tokenVerify.role
            }
            console.log(req.user)
            next()
        }
        catch(e){
            res.status(401).json({
                errors : 'invalid token'
            })
        }
    }
    else{
        res.status(401).json({
            errors : 'token is not provided'
        })
    }
}

module.exports = authenticateUser