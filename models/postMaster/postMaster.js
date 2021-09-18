const mongoose = require('mongoose')
const Shema = mongoose.Schema
const bcrypt = require('bcrypt')

const PostmasterSchema = new Shema({
    userName: {
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
    }
},{ timestamps: true })

PostmasterSchema.methods.isValidPassword = async function (password) {
    const postmaster = this;
    const compare = await bcrypt.compare(password, postmaster.password);

    return compare;
}

const  PostMaster = mongoose.model('Postmaster', PostmasterSchema);
module.exports = PostMaster;