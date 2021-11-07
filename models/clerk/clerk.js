const mongoose = require('mongoose')
const Shema = mongoose.Schema
const bcrypt = require('bcrypt')

const clerkSchema = new Shema({
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
        type:String, 
        required: true
    },email: {
        type:String, 
        required: true
    },status: {
        type:Boolean,
        default: true
    }
},{ timestamps: true })

clerkSchema.methods.isValidPassword = async function (password) {
    const clerk = this;
    const compare = await bcrypt.compare(password, clerk.password);

    return compare;
}

const  clerk = mongoose.model('clerk', clerkSchema);
module.exports = clerk;