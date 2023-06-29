const express = require('express');
const router = express.Router()
const User = require("../schemas/User");
const Flashcard = require("../schemas/Flashcard");
router.get("/", function (req, res) {
    let token = req.get("Authorization");
    if(!token) return res.status(403).json({success:false,result:"Authorization Required"})

    User.findOne({token}).then(response => {
        if(!response) return res.status(403).json({success:false,result:"Authorization Required"})
        
        Flashcard.find({userId:response._id,nextDate:{$lte:new Date()}}).limit(20).then((response) => {
            return res.json({success:true,result:response})
        }).catch(e => {
          
                return res.status(403).json({success:false,result:"main.error"})
            
        });
    })
})
module.exports = router;