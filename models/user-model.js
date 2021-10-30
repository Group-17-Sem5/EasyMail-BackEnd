const mongoose =require('mongoose');
const Schema= mongoose.Schema;


const User= Schema({
    userName:{    
        type:String, 
        required: true,
        unique: true,
    },password:{
        type:String, 
        required: true,
    },addressId:{
        type:String, 
        required: true,
    },mobileNumber:{
        type:String, 
        required: true,
    },branchID:{
        type:String,
        required:true,
    },email:{
        type:String,
        required:true
    },status:{
        type:Boolean,
        required:true
    }
},{ timestamps: true });


module.exports =mongoose.model("User",User);