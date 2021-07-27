const mongoose =require('mongoose');
const Schema= mongoose.Schema;


const PostMan= Schema({
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
    },normalPostIDList:{
        type:String,
        required:false,
    },completedPostIDList:{
        type:String,
        required:false,
    },cancelledPostIDList:{
        type:String,
        required:false,
    }
});


module.exports =mongoose.model("PostMan",PostMan);