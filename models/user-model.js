const mongoose =require('mongoose');
const Schema= mongoose.Schema;


const User= Schema({
    userName:{    
        type:String, 
        required: true,
        unique: true,
                validate:{
            validator: name => /^[a-zA-Z0-9\s]*$/.test(name),
            message:"Name only contain space and letters"
        }
    },password:{
        type:String, 
        required: true,
        minLength: [2, "Too short"],
        maxLength: [256, "Too Long"]
    },addressID:{
        type:String, 
        required: true,
        ref: "Address"
    },mobileNumber:{
        type:String, 
        required: true,
        minLength: [9, "Too short"],
        maxLength: [10, "Too Long"]
    },branchID:{
        type:String,
        required:true,
        ref: "Branch"
    },email:{
        type:String,
        required:true,
        validate: {

                        validator: function(v) {
                            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                        },
                        message: "Please enter a valid email"
                    },

    },status:{
        type:Boolean,
        required:true,
        default:true
    }
},{ timestamps: true });


module.exports =mongoose.model("User",User);