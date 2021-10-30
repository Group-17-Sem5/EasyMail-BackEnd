const mongoose =require('mongoose');
const Schema= mongoose.Schema;


const PostMan= Schema({
    status:{
        type:Boolean,
        required: true},
    username:{
        type:String, 
        required: true,
        unique: true,
    },password:{
        type:String, 
        required: true,
    },area:{
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
    }
},{ timestamps: true });


module.exports =mongoose.model("PostMan",PostMan);