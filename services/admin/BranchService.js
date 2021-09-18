const Branch = require('../../models/postMaster/branch')

exports.findAll = () => {
    return Branch.find()
}

exports.createPostman = ( branchName,mobileNumber,address) => {
    const branch = new Branch({ branchName,mobileNumber,address})
    return branch.save()
}

exports.deletePostman = (id) => {
    return Branch.findByIdAndDelete(id)
}

exports.updatePostman = (id,branchName,mobileNumber,address) => {
    return Branch.updateOne({_id:id},{
        $set: {id,branchName,mobileNumber,address}
    })
}

exports.getPostman = (id) => {
    return Branch.findById(id)
}