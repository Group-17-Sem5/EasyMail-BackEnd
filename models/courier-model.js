const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const Courier=Schema({
    courierID:{
        type:String,
        required:true,
        unique:true,

    },
    addressID:{
        type:String,
        required:true,
    },
    weight:{
        type:Number,
        required:false,
    },
    lastAppearedBranchID:{
        required:true,
        type:String
    },
    postManID:{
        type:String,
        required:false
    },
    sourceBranch:{
        type:String,
        required:true
    },receivingBranch:{
        type:String,
        required:true
    },senderID:{
        type:String,
        required:true
    },receiverID:{
        type:String,
        required:true
    },isAssigned:{
        type:Boolean,
        required:true
    },isDelivered:{
        type:Boolean,
        required:true
    },isCancelled:{
        type:Boolean,
        required:true
    }
});
module.exports =mongoose.model("Courier",Courier);