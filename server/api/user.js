const express = require('express');
const router = express.Router()
const User = require("../schemas/User");
router.get("/", function (req, res) {
    let token = req.get("Authorization");
    if(!token) return res.status(403).json({success:false,result:"Authorization Required"})

    User.findOne({token}).then(response => {
        if(!response) return res.status(403).json({success:false,result:"Authorization Required"})
        return res.json({success:true,result: { // dont send full because it contains sensitive data.
            id: response._id, 
            username: response.username
        }})
    })
})
module.exports = router;