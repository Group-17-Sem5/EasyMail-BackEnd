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
        type:int,
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
        type:boolean,
        required:true
    },isDelivered:{
        type:boolean,
        required:true
    },isCancelled:{
        type:boolean,
        required:true
    }
});
module.exports =mongoose.model("Courier",Courier);