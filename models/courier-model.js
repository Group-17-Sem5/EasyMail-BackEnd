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
        
    },
    postManID:{
        type:String,
        required:false,
    },
    sourceBranchID:{
        type:String,
        required:true,
        
    },receivingBranchID:{
        type:String,
        required:true,
        
    },senderID:{
        type:String,
        required:true,
       
    },receiverID:{
        type:String,
        required:true,
        
    },isAssigned:{
        type:Boolean,
        required:false,
        default: false
    },isDelivered:{
        type:Boolean,
        required:false,
        default: false
    },isCancelled:{
        type:Boolean,
        required:false,
        default: false
    }
},{ timestamps: true });
module.exports =mongoose.model("Courier",Courier);