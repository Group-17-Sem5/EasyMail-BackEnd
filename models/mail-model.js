const mongoose =require('mongoose');
const Schema= mongoose.Schema;


const Mail= Schema({
    mailID:{
        type:String, 
        required: true,
        unique: true,
    },description:{
        type:String, 
        required: true,
    },status:{
        type:String, 
        required: true,
    },location:{
        type:String, 
        required: true,
    },postManID:{
        type:String, 
        required: true,
    }
});


module.exports =mongoose.model("Mailn",Mail);