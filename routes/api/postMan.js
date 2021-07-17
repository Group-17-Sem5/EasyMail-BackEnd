const express = require('express');
const PostMan=require('../../models/postMan.model');
const router=express.Router();
router.route('/register').post((req, res) => {
    console.log('Registering');
    const postMan=new PostMan({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });
    postMan
    .save()
    .then(() => {
        console.log('postMan registered');
        res.status(200).json('Ok');
    }).catch((err) => {
        res.status(403).json({msg:err});
    });

});
router.route('/delete/:userName').delete((req,res) => {
    console.log('deleting');

});
router.route('/update/:userName').patch((req,res) => {
    console.log('deleting');
    
});

module.exports =router;