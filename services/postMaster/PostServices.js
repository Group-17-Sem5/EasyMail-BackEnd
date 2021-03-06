const Post = require('../../models/mail-model')
const mongoose = require('mongoose')

exports.findAll = () => {
    return Post.aggregate([
        {
            $lookup: {
                from: "users",
                localField: 'senderID',
                foreignField: '_id',
                as: "_users"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: 'receiverID',
                foreignField: '_id',
                as: "_user"
            }
        },
        {
            $lookup: {
                from: "branches",
                localField: 'lastAppearedBranchID',
                foreignField: '_id',
                as: "_branches"
            }
        },
        {
            $lookup: {
                from: "postmen",
                localField: 'postManID',
                foreignField: '_id',
                as: "_postman"
            }
        },
        {
            $project: {
                _id: '$_id',
                senderID: { $arrayElemAt: ['$_users.name', 0] },
                receiverID: { $arrayElemAt: ['$_user.name', 0] },
                lastAppearedBranchID: { $arrayElemAt: ['$_branches.branchName', 0] },
                sourceBranchID:1,
                postManID: { $arrayElemAt: ['$_postman.username', 0] },
                state:1
            }
        }
    ])
}

exports.create = (sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID) => {
    const post = new Post({sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID})
    return post.save()
}

exports.del = (id) => {
    return Post.findByIdAndDelete(id)
}

exports.update = (id,lastAppearedBranchID,senderID,receiverID,postManID) => {
    return Post.updateOne({_id:id},{
        $set: {lastAppearedBranchID,senderID,receiverID,postManID}
    })
}

exports.getOne = (id) => {
    return Post.aggregate([
        {
            $match: {
                _id : mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: 'senderID',
                foreignField: '_id',
                as: "_users"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: 'receiverID',
                foreignField: '_id',
                as: "_user"
            }
        },
        {
            $lookup: {
                from: "branches",
                localField: 'lastAppearedBranchID',
                foreignField: '_id',
                as: "_branches"
            }
        },
        {
            $lookup: {
                from: "postmen",
                localField: 'postManID',
                foreignField: '_id',
                as: "_postman"
            }
        },
        // {
        //     $lookup: {
        //         from: "addresses",
        //         localField: 'addressId',
        //         foreignField: '_id',
        //         as: "_usersAddress"
        //     }
        // },
        // {
        //     $lookup: {
        //         from: "addresses",
        //         localField: 'addressId',
        //         foreignField: '_id',
        //         as: "_userAddress"
        //     }
        // },
        {
            $project: {
                _id: '$_id',
                senderID: { $arrayElemAt: ['$_users.name', 0] },
                senderPhone: { $arrayElemAt: ['$_users.mobileNumber', 0] },
                // senderAddress: { $arrayElemAt: ['$_usersAddress.address', 0] },
                // receiverAddress: { $arrayElemAt: ['$_userAddress.address', 0] },
                receiverID: { $arrayElemAt: ['$_user.name', 0] },
                receiverPhone: { $arrayElemAt: ['$_user.mobileNumber', 0] },
                lastAppearedBranchID: { $arrayElemAt: ['$_branches.branchName', 0] },
                sourceBranchID:1,
                postManID: { $arrayElemAt: ['$_postman.username', 0] },
                state:1
            }
        }
    ])
}