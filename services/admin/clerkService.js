const clerk = require('../../models/clerk')

exports.findByEmail = (email) => {
    return clerk.findOne({email})
}

exports.findAll = () => {
    return clerk.find()
}

exports.create = (username,hashPassword,mobileNumber,branchId,email) => {
    const clerk = new clerk({username,password:hashPassword,mobileNumber,branchId,email})
    return clerk.save()
}

exports.del = (id) => {
    return clerk.findByIdAndDelete(id)
}

exports.update = (id,username,mobileNumber,email) => {
    return clerk.updateOne({_id:id},{
        $set: {username,mobileNumber,email}
    })
}

exports.getOne = (id) => {
    return clerk.findById(id)
}