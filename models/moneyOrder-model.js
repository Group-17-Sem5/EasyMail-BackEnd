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
        validate: {
            validator: weight => weight>0,
            message: "Incorrect value for amount"
        }
    },
    sourceBranchID:{
        type:String, 
        required: true,
        ref: 'Branch'
    },receivingBranchID:{
        type:String, 
        required: true,
        ref: 'Branch'
    },senderID:{
        type:String,
        required:true,
        ref: 'User'
    },receiverID:{
        type:String,
        required:true,
        ref: 'User'
    },isDelivered:{
        type: Boolean,
        required:false,
        default: false
    },isCancelled:{
        type:Boolean,
        required:false,
        default: false
    }
},{ timestamps: true });


module.exports =mongoose.model("MoneyOrder",MoneyOrder);