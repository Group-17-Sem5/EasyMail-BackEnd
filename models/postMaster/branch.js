const mongoose = require('mongoose')
const Shema = mongoose.Schema

const BranchSchema = new Shema({
    branchName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
},{ timestamps: true })

const  Branch = mongoose.model('Branch', BranchSchema);
module.exports = Branch;