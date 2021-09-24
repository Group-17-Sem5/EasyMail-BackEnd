const mongoose = require('mongoose')
const Shema = mongoose.Schema

const UserSchema = new Shema({
    email: {
        type: String,
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
    addressId: {
        type: mongoose.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    name: {
        type: String,
        required: true
    }
},{ timestamps: true })

const  User = mongoose.model('USer', UserSchema);
module.exports = User;