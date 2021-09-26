const mongoose = require('mongoose')
const Shema = mongoose.Schema
const bcrypt = require('bcrypt')

const AdminSchema = new Shema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{ timestamps: true })

AdminSchema.methods.isValidPassword = async function (password) {
    const admin = this;
    const compare = await bcrypt.compare(password, admin.password);

    return compare;
}

const  Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;