const mongoose = require('mongoose')
const Shema = mongoose.Schema
const bcrypt = require('bcrypt')

const PostmasterSchema = new Shema({
    username: {
        type: String,
        required: [true,"username is required"],
        minLength: [2, "Too short"],
        maxLength: [50, "Too Long"]
    },
    password: {
        type: String,
        required: [true,"password is required"],
        minLength: [2, "Too short"],
        maxLength: [256, "Too Long"]
    },
    mobileNumber: {
        type: Number,
        required: [true,"mobile number is required"],
        minLength: [9, "Too short"],
        maxLength: [10, "Too Long"]
    },
    branchId: {
        type: mongoose.Types.ObjectId,
        ref: 'Branch'
    },email: {
        type:String, 
        required: [true,"email is required"],
        unique: true,
        validate: {
            validator: email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
            message: "Not valid email"
        }
    },status: {
        type:Boolean,
        default: true
    }
},{ timestamps: true })

PostmasterSchema.methods.isValidPassword = async function (password) {
    const postmaster = this;
    const compare = await bcrypt.compare(password, postmaster.password);

    return compare;
}

const  PostMaster = mongoose.model('Postmaster', PostmasterSchema);
module.exports = PostMaster;