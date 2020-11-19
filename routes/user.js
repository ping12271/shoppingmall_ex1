const express = require('express')
const { modelName } = require('../models/order')
const router = express.Router()

const userModel = require('../models/user')

// 회원가입 API 
// url : localhost:8000/user/register
router.post('/register', (req, res) => {
    const newUser = new userModel ({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    })

    newUser
        .save()
        .then(user => {
            res.json({
                id : user._id,
                username : user.username,
                email : user.email,
                password : user.password
            })
        })
        .catch(err => {
            res.json({
                message : err
            })
        })
})


// 로그인 API
router.post('/login', (req, res) => {

})



module.exports = router