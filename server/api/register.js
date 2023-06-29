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
        if(response) return res.json({success: false,result:"register.username_taken"})
        let token = generateToken(username);
        let hash = hashPassword(password);
        User.create({username,password:hash,token}).then(response => {
       
            return res.json({success: true, result:response.token})
        })
    }).catch(e => {
        return res.json({success: false,result:"register.unexpected_error_login"})
    })
    
})
module.exports = router;