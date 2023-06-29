const express = require('express');
const router = express.Router()
const User = require("../schemas/User");
const Flashcard = require("../schemas/Flashcard");
const {calculateDate} = require("../util")
router.get("/", function (req, res) {
    let token = req.get("Authorization");
    if(!token) return res.status(403).json({success:false,result:"Authorization Required"})

    User.findOne({token}).then(response => {
        if(!response) return res.status(403).json({success:false,result:"Authorization Required"})
        
        Flashcard.find({userId:response._id}).then(response => {
            return res.json({success:true,result:response})
        }).catch(e => {
            return res.status(403).json({success:false,result:"Error while requesting cards"})
        })
        
    }).catch(e => {
        return res.status(403).json({success:false,result:"Authorization Required"})
    })
})

router.post("/", function (req, res) {
    let token = req.get("Authorization");
    if(!token) return res.status(403).json({success:false,result:"Authorization Required"})

    User.findOne({token}).then(response => {
        if(!response) return res.status(403).json({success:false,result:"Authorization Required"})
        let {question,answer} = req.body;

        if(!question || !answer) {
            return res.json({success:false,result:"main.empty_fields"})
        }
        Flashcard.create({question,answer,userId:response._id,priority:0,nextDate:new Date()}).then(response => {
            return res.json({success:true,result:response._id})
        }).catch(e => {
            console.log(e)
            return res.json({success:false,result:"main.error_create"})
        })
        
    }).catch(e => {

        return res.status(403).json({success:false,result:"Authorization Required"})
    })
})

router.post("/answer/:flashcardId", function(req, res) {
    let token = req.get("Authorization");
    if(!token) return res.status(403).json({success:false,result:"Authorization Required"})

    User.findOne({token}).then(response => {
        if(!response) return res.status(403).json({success:false,result:"Authorization Required"})
        let {flashcardId} = req.params;
        if(!flashcardId){
            return res.status(404).json({success:false,result:"Card doesn't exist"})
        }
        Flashcard.findOne({_id:flashcardId}).then(response => {
            if(!response)
                return res.status(404).json({success:false,result:"Card doesn't exist"})
            let {answer} = req.body;
            
            let priorityMove = answer == true ? 1 : -1;
            let newPriority = Math.min(10,Math.max(0,response.priority + priorityMove));

            response.priority = newPriority;
            response.nextDate = calculateDate(response);
                        
            response.save().then(response => {
                return res.json({success:true,result:flashcardId})
            }).catch(e => {
             
                return res.json({success:false,result:"Error happened during saving of progress"})
            })
            
        })
        
    }).catch(e => {
        return res.status(403).json({success:false,result:"Authorization Required"})
    })
})
router.delete("/:flashcardId", function (req, res) {
    let token = req.get("Authorization");
    if(!token) return res.status(403).json({success:false,result:"Authorization Required"})

    User.findOne({token}).then(response => {
        if(!response) return res.status(403).json({success:false,result:"Authorization Required"})
        let {flashcardId} = req.params;
        if(!flashcardId){
            return res.status(404).json({success:false,result:"Card doesn't exist"})
        }
        Flashcard.deleteOne({_id:flashcardId}).then(response => {
            return res.json({success:true,result:flashcardId})
        })
        
    }).catch(e => {
        return res.status(403).json({success:false,result:"Authorization Required"})
    })
})
module.exports = router;