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
    },location:{
        type:String, 
        required: false,
        
    },userIDList:{
        type:Array, 
        required: false,
    },
});
module.exports =mongoose.model("Address",Address);