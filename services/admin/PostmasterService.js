
const Postmaster = require('../../models/postMaster')


exports.findByEmail = (email) => {
    return Postmaster.findOne({email})
}

exports.findAll = () => {
    return Postmaster.find()
}


exports.create = (username,hashPassword,mobileNumber,branchID,email) => {
    const postmaster = new Postmaster({username,password:hashPassword,mobileNumber,branchID,email})

    return postmaster.save()
}

exports.del = (id) => {
    return Postmaster.findByIdAndDelete(id)
}


exports.update = (id,username,mobileNumber,email) => {
    return Postmaster.updateOne({_id:id},{
        $set: {username,mobileNumber,email}

    })
}

exports.getOne = (id) => {
    return Postmaster.findById(id)
}