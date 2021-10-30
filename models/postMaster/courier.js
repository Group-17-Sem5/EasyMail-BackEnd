const mongoose = require('mongoose')
const Shema = mongoose.Schema

const CourierSchema = new Shema({
    courierID:{
        type:String,
        required:[true,"courier id is required"],
        unique:true,
    },
    addressID:{
        type:String,
        ref: 'Address',
        required:true
    },
    lastAppearedBranchID:{
        required:true,
        type:String,
        ref: 'Branch'
    },
    postManID:{
        type:String,
        required:false,
        ref: 'Postman'
    },
    sourceBranch:{
        type:String,
        required:true,
        ref: 'Branch'
    },receivingBranch:{
        type:String,
        required:true,
        ref: 'Branch'
    },senderID:{
        type:String,
        required:true,
        ref: 'User'
    },receiverID:{
        type:String,
        required:true,
        ref: 'User'
    },isAssigned:{
        type:Boolean,
        required:true,
        default: false
    },isDelivered:{
        type:Boolean,
        required:true,
        default: false
    },isCancelled:{
        type:Boolean,
        required:true,
        default: false
    },weight: {
        type: Number,
        required: [true,"weight is required"],
        validate: {
            validator: weight => weight>0,
            message: "Incorrect value for weight"
        }
    }
},{ timestamps: true })

const  Courier = mongoose.model('Courier', CourierSchema);
module.exports = Courier;