const mongoose = require('mongoose')
const Shema = mongoose.Schema

const UserSchema = new Shema({
    email: {
        type: String,
        unique: true,
        validate: {
            validator: email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
            message: "Not valid email"
        }
    },
    password: {
        type: String,
        required: [true,"password is required"],
        minLength: [2, "Too short"],
        maxLength: [256, "Too Long"]
    },
    mobileNumber: {
        type: String,
        required: [true,"mobile number is required"],
        minLength: [9, "Too short"],
        maxLength: [10, "Too Long"]
    },
    addressId: {
        type: mongoose.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    name: {
        type: String,
        required: [true,"name is required"],
        validate:{
            validator: name => /^[a-zA-Z\s]*$/.test(name),
            message:"Name only contain space and letters"
        }
    }
},{ timestamps: true })

const  User = mongoose.model('USer', UserSchema);
module.exports = User;