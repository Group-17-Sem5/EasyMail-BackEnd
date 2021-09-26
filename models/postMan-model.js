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
    },email:{
        type:String, 
        required: true,
    },mobileNumber:{
        type:String, 
        required: true,
    },area: {
        type: String,
        required: true
    },branchId: {
        type: mongoose.Types.ObjectId,
        ref: 'Branch',
    },status: {
        type: Boolean,
        default: true
    }
});


module.exports =mongoose.model("PostMan",PostMan);