const mongoose =require('mongoose');
const Schema= mongoose.Schema;


const MoneyOrder= Schema({
    moneyOrderID:{
        type:String, 
        required: true,
        unique: true,
    },specialCode:{
        type:String, 
        required: true,
        unique: true,
    },amount:{
        type:String, 
        required: true,
    },date:{
        type:Date, 
        required: true,
    },
    sourceBranch:{
        type:String, 
        required: true,
    },receivingBranch:{
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
});


module.exports =mongoose.model("MoneyOrder",MoneyOrder);