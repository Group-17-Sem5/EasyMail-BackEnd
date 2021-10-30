const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressSchema = new Schema({
    addressID:{
        type: String,
        required: [true, "Address is required"],
        minLength: [6, "Too short"],
        maxLength: [256, "Too Long"],
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
}
,{ timestamps: true })

const  Address = mongoose.model('Address', AddressSchema);
module.exports = Address;