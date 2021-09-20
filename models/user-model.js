const mongoose =require('mongoose');
const Schema= mongoose.Schema;


const User= Schema({
    username:{
        type:String, 
        required: true,
        unique: true,
    },password:{
        type:String, 
        required: true,
    },addressID:{
        type:String, 
        required: true,
    },phoneNumber:{
        type:String, 
        required: true,
    },branchID:{
        type:String,
        required:true,
    },sentPostIDList:{
        type:Array,
        required:false,
    },receivedPostIDList:{
        type:Array,
        required:false,
    },sentMoneyOrdersList:{
        type:Array,
        required:false,
    },receivedMoneyOrdersList:{
        type:Array,
        required:false,
    }
});


module.exports =mongoose.model("User",User);