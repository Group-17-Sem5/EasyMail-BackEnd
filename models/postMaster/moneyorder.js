const mongoose = require('mongoose')
const Shema = mongoose.Schema

const MoneyorderSchema = new Shema({
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
        required: [true,"amount is required"],
        validate: {
            validator: weight => weight>0,
            message: "Incorrect value for amount"
        }
    }
},{ timestamps: true })

const  Moneyorder = mongoose.model('Moneyorder', MoneyorderSchema);
module.exports = Moneyorder;