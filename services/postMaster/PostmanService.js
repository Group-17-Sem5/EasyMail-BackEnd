const mongoose = require('mongoose')
const Postman = require('../../models/postMan-model')

exports.findAll = () => {
    return Postman.find()
}

exports.createPostman = (username,hashPassword,email,mobileNumber,area,branchID) => {
    const postman = new Postman({username,password:hashPassword,email,mobileNumber,area,branchID})
    return postman.save()
}

exports.deletePostman = (id) => {
    return Postman.findByIdAndDelete(id)
}

exports.updatePostman = (id,username,email,mobileNumber,area) => {
    return Postman.updateOne({_id:id},{
        $set: {username,email,mobileNumber,area}
    })
}

exports.getPostman = (id) => {
    return Postman.findById(id)
}

exports.getPostmanCount = (branchID) => {
    return Postman.aggregate([
        {
            $match:{branchID:branchID}
        },
        {
            $count:"postmanCount"
        }
    ])
}

exports.changeStatus = (id , status) => {
    return Postman.updateOne({_id:id},{
        $set: {status:!status}
    })
}

