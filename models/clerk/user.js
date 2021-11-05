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
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    branchID: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ['active','not active'],
        default: 'active'
    }
},{ timestamps: true })

const  User = mongoose.model('User', UserSchema);
module.exports = User;