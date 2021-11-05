const express = require('express');
const { models } = require('mongoose');
const router = express.Router();
const post = require('../../models/clerk/post');

router.route('/create').post((req,res)=>{
    const sender =  req.body.sender;
    const  receiver = req.body.receiver;
    const  sourceBranch = req.body.sourceBranch;
    const  lastAppearedBranch = req.body.lastAppearedBranch;

    const newPost = new post({
        sender,
        receiver,
        sourceBranch,
        lastAppearedBranch
    });

    newPost.save();

})
module.exports = router;