const MoneyOrder = require('../../models/moneyorder-model')
const mongoose = require('mongoose')

exports.findAll = () => {
    return MoneyOrder.find()
        // {
        //     $lookup: {
        //         from: "users",
        //         localField: 'senderID',
        //         foreignField: '_id',
        //         as: "_users"
        //     }
        // },
        // {
        //     $lookup: {
        //         from: "users",
        //         localField: 'receiverID',
        //         foreignField: '_id',
        //         as: "_user"
        //     }
        // },
        // {
        //     $lookup: {
        //         from: "branches",
        //         localField: 'sourceBranchID',
        //         foreignField: '_id',
        //         as: "_branches"
        //     }
        // },
        // {
        //     $lookup: {
        //         from: "postmen",
        //         localField: 'postManID',
        //         foreignField: '_id',
        //         as: "_postman"
        //     }
        // },
        // {
        //     $project: {
        //         _id: '$_id',
        //         senderID: { $arrayElemAt: ['$_users.userName', 0] },
        //         receiverID: { $arrayElemAt: ['$_user.userName', 0] },
        //         sourceBranchID: { $arrayElemAt: ['$_branches.branchName', 0] },
        //         sourceBranchID:1,
        //         postManID: { $arrayElemAt: ['$_postman.userName', 0] },
        //         postManID: 1,
        //         state:1,
        //         amount:1,
        //         specialCode:1
        //     }
        // }
    //])
}

exports.create = (sourceBranchID,senderID,receiverID,postManID,amount,specialCode) => {
    const moneyorder = new MoneyOrder({sourceBranchID,sourceBranchID,senderID,receiverID,postManID,amount,specialCode})
    return moneyorder.save()
}

exports.del = (id) => {
    return MoneyOrder.findByIdAndDelete(id)
}


exports.con = (id , isDelivered) => {
    return MoneyOrder.updateOne({_id:id},{
        $set: {isDelivered : !isDelivered}
    })
}

exports.update = (id,sourceBranchID,senderID,receiverID,amount,specialCode) => {
    return MoneyOrder.updateOne({_id:id},{
        $set: {sourceBranchID,senderID,receiverID,amount,specialCode}
    })
}

exports.getOne = (id) => {
    return MoneyOrder.findById(id)
    // return Moneyorder.aggregate([
    //     {
    //         $match: {
    //             _id : mongoose.Types.ObjectId(id)
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "users",
    //             localField: 'senderID',
    //             foreignField: '_id',
    //             as: "_users"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "users",
    //             localField: 'receiverID',
    //             foreignField: '_id',
    //             as: "_user"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "branches",
    //             localField: 'sourceBranchID',
    //             foreignField: '_id',
    //             as: "_branches"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "postmen",
    //             localField: 'postManID',
    //             foreignField: '_id',
    //             as: "_postman"
    //         }
    //     },
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
    //     {
    //         $project: {
    //             _id: '$_id',
    //             senderName: { $arrayElemAt: ['$_users.userName', 0] },
    //             senderID: 1,
    //             senderPhone: { $arrayElemAt: ['$_users.mobileNumber', 0] },
    //             // senderAddress: { $arrayElemAt: ['$_usersAddress.address', 0] },
    //             // receiverAddress: { $arrayElemAt: ['$_userAddress.address', 0] },
    //             receiverName: { $arrayElemAt: ['$_user.userName', 0] },
    //             receiverID: 1,
    //             receiverPhone: { $arrayElemAt: ['$_user.mobileNumber', 0] },
    //             lastAppearedBranchName: { $arrayElemAt: ['$_branches.branchName', 0] },
    //             sourceBranchID: 1,
    //             sourceBranchID:1,
    //             postManName: { $arrayElemAt: ['$_postman.userName', 0] },
    //             postManID: 1,
    //             state:1,
    //             amount:1,
    //             specialCode:1
    //         }
    //     }
    // ])
}

exports.updatePostman = (id , postManID) => {
    return MoneyOrder.updateOne({_id:id},{
        $set: {postManID}
    })
}