const Branch = require('../../models/branch')

exports.findAll = () => {
    return Branch.find()
}

exports.createBranch = (branchName,mobileNumber,address ) => {
    const branch = new Branch({branchName,mobileNumber,address })
    return branch.save()
}

exports.deleteBranch = (id) => {
    return Branch.findByIdAndDelete(id)
}

exports.updateBranch = (id,branchName,mobileNumber,address ) => {
    return Branch.updateOne({_id:id},{
        $set: {branchName,mobileNumber,address }
    })
}

exports.getBranch = (id) => {
    return Branch.findById(id)
}