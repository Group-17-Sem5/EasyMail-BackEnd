const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    NIC: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['manager', 'clerk'],
        default: 'clerk'
    },
})

const User = mongoose.model('User',UserSchema)

exports.listUsers = () => {
    return User.find()
}

exports.createUser = (name, address, mobile, NIC, username, password, type) => {
    const user = new User ({
        name, address, mobile, NIC, username, password, type
    })
    return user.save()
}

exports.editUser = (_id, name, address, mobile, NIC, username) =>{
    return User.updateOne({ _id }, {
        $set: { name, address, mobile, NIC, username }
    })
}

exports.deleteOne = (_id) => {
    return User.findOneAndDelete({_id})
}