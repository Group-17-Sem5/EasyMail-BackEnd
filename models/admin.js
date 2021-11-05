const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const AdminSchema = new Schema({
    username: {
        type: String,
        required: [true,"username is required"],
        minLength: [2, "Too short"],
        maxLength: [50, "Too Long"],
        unique: true,
        validate: {
            validator: username => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username),
            message: "Not valid email"
        }
    },
    password: {
        type: String,
        required: [true,"password is required"],
        minLength: [2, "Too short"],
        maxLength: [256, "Too Long"]
    }
},{ timestamps: true })

AdminSchema.methods.isValidPassword = async function (password) {
    const admin = this;
    const compare = await bcrypt.compare(password, admin.password);

    return compare;
}

const  Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;