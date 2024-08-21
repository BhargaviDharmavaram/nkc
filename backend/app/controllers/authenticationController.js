const Authentication = require('../models/authenticationModel')
const pick = require('lodash/pick')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')
//const sendMail = require('../helpers/nodemailer')


const authenticationControllers = {}

authenticationControllers.register = async (req,res) => {
    try{
        const existingUser = await Authentication.findOne({});
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists. Only one user is allowed.' });
        }
        const body = pick(req.body, ['username', 'email', 'password'])
        if(!validator.isStrongPassword(body.password)){
            return res.json({
                errors : 'Password must be at leat 8 characters long and contain atleast one uppercase letter, one number, and one special character'
            })
        }
        const userRegister = new Authentication(body)
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(userRegister.password, salt)
        userRegister.password = hashedPassword
        const result = await userRegister.save()
        res.json(result)
    }catch(e){
        res.status(404).json(e.message)
    }
}

authenticationControllers.login = async (req,res) => {
    try{
        const body = pick(req.body,['email', 'password'])
        const user = await Authentication.findOne({email : body.email})
        console.log('user', user)
        if(user){
            const match = await bcrypt.compare(body.password, user.password)
            console.log('compare', match)
            if(match){
                const tokenData = {
                    id : user._id
                }
                
                console.log('tokendata-login', tokenData)
                const token = jwt.sign(tokenData , process.env.JWT_SECRET, { expiresIn: '1h' })
                res.json({
                    token : `Bearer ${token}`
                })
            }
            else{
                res.status(404).json({
                    errors : 'invalid email / password'
                })
            }
        }
        else{
            res.status(404).json({
                errors : 'invalid email / password'
            })
        }
    }catch(e){
        res.status(404).json(e.message)
    }
}

authenticationControllers.account = async (req,res) => {
    try{
        const user = await Authentication.findById(req.user.id)
        res.json(pick(user, ['id', 'username','email']))
    }catch(e){
        res.status(404).json(e.message)
    }
}


// Edit/Update User Profile
authenticationControllers.editUser = async (req, res) => {
    try {
        const id = req.params.id
        const loggedInUserId = req.user.id // user ID from the token

        if (id !== loggedInUserId) {
            return res.status(403).json({
                errors: 'You are not authorized to update your account, provided valid token'
            })
        }

        const updates = pick(req.body, ['username', 'email', 'password']) // Allow authentication to update username, email, and password

        // Validate and hash password if provided
        if (updates.password && !validator.isStrongPassword(updates.password)) {
            return res.status(400).json({
                errors: 'Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character'
            })
        }

        // If a new password is provided, hash it
        if (updates.password) {
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(updates.password, salt)
            updates.password = hashedPassword
        }

        const updatedUser = await Authentication.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
        res.json({updatedUser: updatedUser, message: `The user named as ${updatedUser.username} updated succesfully`})
    } catch (e) {
        res.status(400).json(e.message)
    }
}


module.exports = authenticationControllers