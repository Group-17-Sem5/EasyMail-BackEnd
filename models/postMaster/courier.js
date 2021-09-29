const mongoose = require('mongoose')
const Shema = mongoose.Schema

const CourierSchema = new Shema({
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
    receivingBranchID: {
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