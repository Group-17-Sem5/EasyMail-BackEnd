const mongoose = require('mongoose')
const Shema = mongoose.Schema

const MoneyOrderSchema = new Shema({
    // addressID: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Address'
    // },
    lastAppearedBranchID: {
        type: mongoose.Types.ObjectId,
        ref: 'Branch'
    },
    sourceBranchID: {
        type: mongoose.Types.ObjectId,
        ref: 'Branch'
    },
    senderID: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    receiverID: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    state: {
        type: String,
        enum: ['cancelled','delivered','pending','assigned'],
        default: 'pending'
    },
    postManID: {
        type: mongoose.Types.ObjectId,
        ref: 'Postman' 
    },amount: {
        type: Number,
        required: true
    }
},{ timestamps: true })

const  MoneyOrder = mongoose.model('MoneyOrder', MoneyOrderSchema);
module.exports = MoneyOrder;