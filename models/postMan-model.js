const mongoose =require('mongoose');
const Schema= mongoose.Schema;


const PostMan= Schema({
    status:{
        type:Boolean,
        required: true,},
    username:{
        type:String, 
        required: [true,"username is required"],
        minLength: [2, "Too short"],
        maxLength: [50, "Too Long"]
    },password:{
        type:String, 

        required: [true,"password is required"],
        minLength: [2, "Too short"],
        maxLength: [256, "Too Long"]
    },email:{

        type:String, 
        required: [true,"email is required"],
        unique: true,
        validate: {
            validator: email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
            message: "Not valid email"
        }
    },mobileNumber:{
        type:String, 

        required: [true,"mobile number is required"],
        minLength: [9, "Too short"],
        maxLength: [10, "Too Long"]
    },area: {
        type: String,
        required: [true,"name is required"],
        minLength: [2, "Too short"],
        maxLength: [256, "Too Long"]
    }
    ,branchID:{
        type:String,
        required:true,
    }
},{ timestamps: true });


module.exports =mongoose.model("PostMan",PostMan);