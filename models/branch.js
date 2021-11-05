const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BranchSchema = new Schema({
    branchID:{
        type: String,
        required: [true, "Address is required"],
        minLength: [6, "Too short"],
        maxLength: [256, "Too Long"],
        unique: true,
    },
    branchName: {
        type: String,
        required: [true,"Branch name is required"],
        pattern: [/^[a-zA-Z\s]*$/,"Branch name only contain letters and space"]
    },
    mobileNumber: {
        type: String,
        required: [true,"Mobile number is required"],
        minLength: [9, "Too short"],
        maxLength: [10, "Too Long"]
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        minLength: [6, "Too short"],
        maxLength: [256, "Too Long"]
    }
},{ timestamps: true })

const  Branch = mongoose.model('Branch', BranchSchema);
module.exports = Branch;