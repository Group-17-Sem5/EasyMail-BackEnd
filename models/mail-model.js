const mongoose =require('mongoose');
const Schema= mongoose.Schema;


const Mail= Schema({
    addressID:{
        type:String, 
        required: true,
        ref: "Address"
    },sourceBranchID:{
        type:String, 
        required: true,
        ref: "Branch"
    },receivingBranchID:{
        type:String, 
        required: true,
        ref: "Branch"
    },
    lastAppearedBranchID:{
        type:String, 
        required: true,
        ref: "Branch"
    },postManID:{
        type:String, 
        required: false,
        ref: "Postman"
    },senderID:{
        type:String,
        required:false,
        ref: "User"
    },receiverID:{
        type:String,
        required:false,
        ref: "User"
    },isAssigned:{
        type:Boolean,
        required:false,
    },isDelivered:{
        type: Boolean,
        required:false,
    },isCancelled:{
        type:Boolean,
        required:false,
    }
},{ timestamps: true });


module.exports =mongoose.model("Mail",Mail);