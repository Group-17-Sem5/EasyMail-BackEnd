const mongoose = require('mongoose')
const Shema = mongoose.Schema

const MailSchema = new Shema({
    mailID:{
        type:String, 
        required: true,
        unique: true,
    },addressID:{
        type:String, 
        required: true,
        ref: 'Address'
    },sourceBranchID:{
        type:String, 
        required: true,
        ref: 'Branch'
    },receivingBranchID:{
        type:String, 
        required: true,
        ref: 'Branch'
    },
    lastAppearedBranch:{
        type:String, 
        required: true,
        ref: 'Branch'
    },postManID:{
        type:String, 
        required: true,
        ref: 'Postman'
    },senderID:{
        type:String,
        required:false,
        ref: 'User'
    },receiverID:{
        type:String,
        required:false,
        ref: 'User'
    },isAssigned:{
        type:Boolean,
        required:true,
    },isDelivered:{
        type: Boolean,
        required:true,
    },isCancelled:{
        type:Boolean,
        required:true,
    }
},{ timestamps: true })

const  Mail = mongoose.model('Mail', MailSchema);
module.exports = Mail;