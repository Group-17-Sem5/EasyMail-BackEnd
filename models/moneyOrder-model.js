const mongoose =require('mongoose');
const Schema= mongoose.Schema;


const MoneyOrder= Schema({
    specialCode:{
        type:String, 
        required: true,
        unique: true,
    },amount:{
        type:String, 
        required: true,
    },
    sourceBranchID:{
        type:String, 
        required: true,
    },receivingBranchID:{
        type:String, 
        required: true,
    },senderID:{
        type:String,
        required:true,
    },receiverID:{
        type:String,
        required:true,
    },isDelivered:{
        type: Boolean,
        required:true,
    },isCancelled:{
        type:Boolean,
        required:true,
    }
},{ timestamps: true });


module.exports =mongoose.model("MoneyOrder",MoneyOrder);