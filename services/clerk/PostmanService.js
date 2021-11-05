const mongoose = require('mongoose')
const Postman = require('../../models/postMan-model')

exports.findAll = () => {
    return Postman.find()
    {/* return Post.aggregate([
        {
            $lookup: {
                from: "branches",
                localField: 'branchId',
                foreignField: '_id',
                as: "_branches"
            }
        },
        {
            $project: {
                _id: '$_id',
                area: 1,
                email:1,
                branchId: { $arrayElemAt: ['$_branches.branchName', 0] },
                mobileNumber:1,
                password: 1,
                status:1,
                username:1
            }
        }
    ]) */}
}

exports.createPostman = (username,hashPassword,email,mobileNumber,area,branchId) => {
    const postman = new Postman({username,password:hashPassword,email,mobileNumber,area,branchId})
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

exports.getPostmanCount = (branchId) => {
    return Postman.aggregate([
        {
            $match:{branchId:mongoose.Types.ObjectId(branchId)}
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