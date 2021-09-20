const mongoose = require('mongoose')
const Shema = mongoose.Schema

const UserSchema = new Shema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    address: {
        type: mongoose.Types.ObjectId,
        ref: 'Branch'
    }
},{ timestamps: true })

const  User = mongoose.model('USer', UserSchema);
module.exports = User;