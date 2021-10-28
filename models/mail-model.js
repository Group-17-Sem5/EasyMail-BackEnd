const mongoose =require('mongoose');
const Schema= mongoose.Schema;


const Mail= Schema({
    addressID:{
        type:String, 
        required: true,
    },sourceBranchID:{
        type:String, 
        required: true,
    },receivingBranchID:{
        type:String, 
        required: true,
    },
    lastAppearedBranchID:{
        type:String, 
        required: true,
    },postManID:{
        type:String, 
        required: false,
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
},{ timestamps: true });


module.exports =mongoose.model("Mail",Mail);