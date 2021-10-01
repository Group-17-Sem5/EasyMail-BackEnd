const mongoose =require('mongoose');
const Schema= mongoose.Schema;


const Mail= Schema({
    mailID:{
        type:String, 
        required: true,
        unique: true,
    },addressID:{
        type:String, 
        required: true,
    },sourceBranchID:{
        type:String, 
        required: true,
    },receivingBranchID:{
        type:String, 
        required: true,
    },
    lastAppearedBranch:{
        type:String, 
        required: true,
    },postManID:{
        type:String, 
        required: true,
    },senderID:{
        type:String,
        required:false,
    },receiverID:{
        type:String,
        required:false,
    },isAssigned:{
        type:Boolean,
        required:true,
    },isDelivered:{
        type: Boolean,
        required:true,
    },isCancelled:{
        type:Boolean,
        required:true,
    }
});


module.exports =mongoose.model("Mail",Mail);