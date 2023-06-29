const express = require('express');
const router = express.Router()
const User = require("../schemas/User");
const {generateToken, hashPassword} = require("../util");
router.post("/", function (req, res) {
    let {username,password} = req.body;
    if(!username || !password){
        return res.json({success: false,result:"register.field_empty"})
    }

    if(!(username.length >= 3 &&  username.length <= 15)){
        return res.json({success: false,result:"register.username_length"})
    }
    if(!(password.length >= 3 &&  password.length <= 60)){
        return res.json({success: false,result:"register.password_length"})
    }

    User.findOne({username}).then(response => {
        if(!response) return res.json({success: false,result:"register.username_not_taken"})
        if(!response.validatePassword(password)){
            return res.json({success: false,result:"register.username_not_taken"})
        }
        let token = generateToken(username);
        response.token = token;
        response.save().then(response => {
            return res.json({success: true, result:response.token})
        })
    }).catch(e => {
        console.log(e)
        return res.json({success: false,result:"register.unexpected_error_login"})
    })
    
})
module.exports = router;