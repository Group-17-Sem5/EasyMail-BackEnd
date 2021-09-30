const mongoose =require('mongoose');
const Schema= mongoose.Schema;
const Address= Schema({
    addressID:{
        type:String, 
        required: true,
        unique: true,
    },description:{
        type:String, 
        required: true,
    },lat:{
        type:String, 
        required: true,
        
    },lng:{
        type:String, 
        required: true,
    },
    userIDList:{
        type:Array, 
        required: false,
    },
    branchID:{
        type:String, 
        required: true,
    },
});
module.exports =mongoose.model("Address",Address);