const mongoose = require('mongoose')
const Shema = mongoose.Schema

const MoneyOrderSchema = new Shema({
    // addressID: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Address'
    // },
    receivingBranchID: {
        type: String,
        required: true
    },
    sourceBranchID: {
        type: String,
        required: true
    },
    senderID: {
        type: String,
        required: true
    },
    receiverID: {
        type: String,
        required: true
    },
    //state: {
    //    type: String,
    //    enum: ['cancelled','delivered','pending','assigned'],
    //    default: 'pending'
    //},
    isCancelled: {
        type: Boolean,
        default: true
    },
    isDelivered: {
        type: Boolean,
        default: true
     
    },amount: {
        type: Number,
        required: true
    },
    specialCode: {
        type: String,
        required: true,
    }
},{ timestamps: true })


const  MoneyOrder = mongoose.model('MoneyOrder', MoneyOrderSchema);
module.exports = MoneyOrder;