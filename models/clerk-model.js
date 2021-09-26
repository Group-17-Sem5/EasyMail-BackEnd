const mongoose =require('mongoose');
const Schema= mongoose.Schema;


const clerk= Schema({
    username:{
        type:String, 
        required: true,
        unique: true,
    },password:{
        type:String, 
        required: true,
    },email:{
        type:String, 
        required: true,
    },mobileNumber:{
        type:String, 
        required: true,
    }
});


module.exports =mongoose.model("clerk",clerk);