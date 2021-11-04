const Courier = require('../../models/courier-model')
const mongoose = require('mongoose')

// exports.findAll = () => {
//     return Courier.aggregate([
//         {
//             $lookup: {
//                 from: "users",
//                 localField: 'senderID',
//                 foreignField: '_id',
//                 as: "_users"
//             }
//         },
//         {
//             $lookup: {
//                 from: "users",
//                 localField: 'receiverID',
//                 foreignField: '_id',
//                 as: "_user"
//             }
//         },
//         {
//             $lookup: {
//                 from: "branches",
//                 localField: 'lastAppearedBranchID',
//                 foreignField: '_id',
//                 as: "_branches"
//             }
//         },
//         {
//             $lookup: {
//                 from: "postmen",
//                 localField: 'postManID',
//                 foreignField: '_id',
//                 as: "_postman"
//             }
//         },
//         {
//             $project: {
//                 _id: '$_id',
//                 senderID: { $arrayElemAt: ['$_users.name', 0] },
//                 receiverID: { $arrayElemAt: ['$_user.name', 0] },
//                 lastAppearedBranchID: { $arrayElemAt: ['$_branches.branchName', 0] },
//                 sourceBranchID:1,
//                 postManID: { $arrayElemAt: ['$_postman.username', 0] },
//                 state:1,
//                 weight:1
//             }
//         }
//     ])
// }
exports.findAll = () => {
    return Courier.find()
}

exports.create = (sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,weight,courierID,addressID,receivingBranch) => {
    const courier = new Courier({sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,weight,courierID,addressID,receivingBranchID:receivingBranch})
    return courier.save()
}

exports.del = (id) => {
    return Courier.findByIdAndDelete(id)
}

exports.update = (id,sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,weight,addressID,receivingBranch) => {
    return Courier.updateOne({_id:id},{
        $set: {sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,weight,addressID,receivingBranchID:receivingBranch}
    })
}

// exports.getOne = (id) => {
//     return Courier.aggregate([
//         {
//             $match: {
//                 _id : mongoose.Types.ObjectId(id)
//             }
//         },
//         {
//             $lookup: {
//                 from: "users",
//                 localField: 'senderID',
//                 foreignField: '_id',
//                 as: "_users"
//             }
//         },
//         {
//             $lookup: {
//                 from: "users",
//                 localField: 'receiverID',
//                 foreignField: '_id',
//                 as: "_user"
//             }
//         },
//         {
//             $lookup: {
//                 from: "branches",
//                 localField: 'lastAppearedBranchID',
//                 foreignField: '_id',
//                 as: "_branches"
//             }
//         },
//         {
//             $lookup: {
//                 from: "postmen",
//                 localField: 'postManID',
//                 foreignField: '_id',
//                 as: "_postman"
//             }
//         },
//         // {
//         //     $lookup: {
//         //         from: "addresses",
//         //         localField: 'addressId',
//         //         foreignField: '_id',
//         //         as: "_usersAddress"
//         //     }
//         // },
//         // {
//         //     $lookup: {
//         //         from: "addresses",
//         //         localField: 'addressId',
//         //         foreignField: '_id',
//         //         as: "_userAddress"
//         //     }
//         // },
//         {
//             $project: {
//                 _id: '$_id',
//                 senderName: { $arrayElemAt: ['$_users.name', 0] },
//                 senderID: 1,
//                 senderPhone: { $arrayElemAt: ['$_users.mobileNumber', 0] },
//                 // senderAddress: { $arrayElemAt: ['$_usersAddress.address', 0] },
//                 // receiverAddress: { $arrayElemAt: ['$_userAddress.address', 0] },
//                 receiverName: { $arrayElemAt: ['$_user.name', 0] },
//                 receiverID: 1,
//                 receiverPhone: { $arrayElemAt: ['$_user.mobileNumber', 0] },
//                 lastAppearedBranchName: { $arrayElemAt: ['$_branches.branchName', 0] },
//                 lastAppearedBranchID: 1,
//                 sourceBranchID:1,
//                 postManName: { $arrayElemAt: ['$_postman.username', 0] },
//                 postManID: 1,
//                 state:1,
//                 weight:1
//             }
//         }
//     ])
// }

exports.getOne = (id) => {
    return Courier.findById(id)
}

exports.updatePostman = (id , postManID) => {
    return Courier.updateOne({_id:id},{
        $set: {postManID,isAssigned: true}
    })
}

exports.filterByDate = (startDate,endDate) => {
    return Courier.find({
        created_at: {
            $gte: startDate,
            $lt: Date(endDate)
        }
    })
}


exports.countByDateTotal = () => {
    return Courier.aggregate(
        [
            {
                $group:
                {
                    _id:
                    {
                        day: { $dayOfMonth: "$createdAt" },
                        month: { $month: "$createdAt" }, 
                        year: { $year: "$createdAt" }
                    }, 
                    count: { $sum:1 },
                    date: { $first: "$createdAt" },
                    // isAssigned:{$first:"$isAssigned"},
                    // isCancelled:{$first:"$isCancelled"},
                    // isDelivered:{$first:"$isDelivered"}
                }
            },
            {
                $project:
                {
                    date:
                    {
                        $dateToString: { format: "%m-%d-%Y", date: "$date" }
                    },
                    count: 1,
                    _id: 0,
                    // isAssigned:1,
                    // isCancelled:1,
                    // isDelivered:1
                }
            }
        ])
}

exports.countByDate = () => {
    return Courier.aggregate(
        [
            {
                $match: {
                    isDelivered: true
                }
            },
            {
                $group:
                {
                    _id:
                    {
                        day: { $dayOfMonth: "$createdAt" },
                        month: { $month: "$createdAt" }, 
                        year: { $year: "$createdAt" }
                    }, 
                    count: { $sum:1 },
                    date: { $first: "$createdAt" },
                    // isAssigned:{$first:"$isAssigned"},
                    // isCancelled:{$first:"$isCancelled"},
                    // isDelivered:{$first:"$isDelivered"}
                }
            },
            {
                $project:
                {
                    date:
                    {
                        $dateToString: { format: "%m-%d-%Y", date: "$date" }
                    },
                    count: 1,
                    _id: 0,
                    // isAssigned:1,
                    // isCancelled:1,
                    // isDelivered:1
                }
            }
        ])
}

exports.countByDateCancel = () => {
    return Courier.aggregate(
        [
            {
                $match: {
                    isCancelled: true
                }
            },
            {
                $group:
                {
                    _id:
                    {
                        day: { $dayOfMonth: "$createdAt" },
                        month: { $month: "$createdAt" }, 
                        year: { $year: "$createdAt" }
                    }, 
                    count: { $sum:1 },
                    date: { $first: "$createdAt" },
                    // isAssigned:{$first:"$isAssigned"},
                    // isCancelled:{$first:"$isCancelled"},
                    // isDelivered:{$first:"$isDelivered"}
                }
            },
            {
                $project:
                {
                    date:
                    {
                        $dateToString: { format: "%m-%d-%Y", date: "$date" }
                    },
                    count: 1,
                    _id: 0,
                    // isAssigned:1,
                    // isCancelled:1,
                    // isDelivered:1
                }
            }
        ])
}