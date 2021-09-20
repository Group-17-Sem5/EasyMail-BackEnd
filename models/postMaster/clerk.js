const mongoose = require('mongoose')
const Shema = mongoose.Schema
const bcrypt = require('bcrypt')

const ClerkSchema = new Shema({
    username: {
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
    branchId: {
        type: mongoose.Types.ObjectId,
        ref: 'Branch'
    },email: {
        type:String, 
        required: true
    },status: {
        type:Boolean,
        default: true
    }
},{ timestamps: true })

ClerkSchema.methods.isValidPassword = async function (password) {
    const clerk = this;
    const compare = await bcrypt.compare(password, clerk.password);

    return compare;
}

const  Clerk = mongoose.model('Clerk', ClerkSchema);
module.exports = Clerk;