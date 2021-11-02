const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const Courier=Schema({
    addressID:{
        type:String,
        required:true,
    },
    weight:{
        type:Number,
        required:false,
        validate: {
        validator: weight => weight>0,
        message: "Incorrect value for weight"},
    },
    lastAppearedBranchID:{
        required:true,
        type:String,
        ref:'Branch'
    },
    postManID:{
        type:String,
        required:false,
        ref:'Postman'
    },
    sourceBranchID:{
        type:String,
        required:true,
        ref:'Branch'
    },receivingBranchID:{
        type:String,
        required:true,
        ref:'Branch'
    },senderID:{
        type:String,
        required:true,
        ref:'User'
    },receiverID:{
        type:String,
        required:true,
        ref:'User'
    },isAssigned:{
        type:Boolean,
        required:false
    },isDelivered:{
        type:Boolean,
        required:false
    },isCancelled:{
        type:Boolean,
        required:false
    }
},{ timestamps: true });
module.exports =mongoose.model("Courier",Courier);