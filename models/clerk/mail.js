const mongoose = require('mongoose')
const Shema = mongoose.Schema

const MailSchema = new Shema({
    addressID: {
         type: String,
         required : true
    },
    
    sourceBranchID: {
        type: String,
        ref: 'Branch'
    },
   // receivingBranchID: {
    //  type: mongoose.Types.ObjectId,
    //  ref: 'Branch'
    //},
    senderID: {
        type: String,
        ref: 'User'
    },
    receiverID: {
        type: String,
        ref: 'User'
    },
    lastAppearedBranchID: {
        type: String,
        ref: 'Branch'
    },
    postManID: {
        type: String,
        ref: 'Postman' 
    },
    // state: {
    //    type: String,
    //    enum: ['cancelled','delivered','pending','assigned'],
    //    default: 'pending'
    //}
    isAssigned: {
        type: Boolean,
        default: true
    },
    isCancelled: {
        type: Boolean,
        default: true
    },
    isDelivered: {
        type: Boolean,
        default: true
    }
},{ timestamps: true })

const  Mail = mongoose.model('Mail', MailSchema);
module.exports = Mail;