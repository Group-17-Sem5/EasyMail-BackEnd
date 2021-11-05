const User = require('../../models/user-model')

exports.findByEmail = (email) => {
    return User.findOne({email})
}

exports.findAll = () => {
    return User.find()
}

// exports.findAll = () => {
//     return User.find()
// }

exports.create = ( email, mobileNumber, addressId,hashPassword, userName,branchID ) => {
    const user = new User({ email, mobileNumber, addressId,password:hashPassword, userName,branchID })
    return user.save()
}

exports.del = (id) => {
    return User.findByIdAndDelete(id)
}

exports.update = (id,userName,mobileNumber,email,branchID) => {
    return User.updateOne({_id:id},{
        $set: {userName,mobileNumber,email,branchID}
    })
}

exports.getOne = (id) => {
    return User.findById(id)
}