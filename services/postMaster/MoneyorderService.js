const Moneyorder = require('../../models/moneyOrder-model')
const mongoose = require('mongoose')

// exports.findAll = () => {
//     return Moneyorder.aggregate([
//         {
//             $lookup: {
//                 from: "users",
//                 localField: 'senderID',
//                 foreignField: 'userName',
//                 as: "_users"
//             }
//         },
//         {
//             $lookup: {
//                 from: "users",
//                 localField: 'receiverID',
//                 foreignField: 'userName',
//                 as: "_user"
//             }
//         },
//         {
//             $lookup: {
//                 from: "branches",
//                 localField: 'lastAppearedBranchID',
//                 foreignField: 'branchID',
//                 as: "_branches"
//             }
//         },
//         {
//             $lookup: {
//                 from: "postmen",
//                 localField: 'postManID',
//                 foreignField: 'username',
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
//                 amount:1
//             }
//         }
//     ])
// }
exports.findAll = () => {
    return Moneyorder.find()
}

exports.create = (sourceBranchID,receivingBranchID,specialCode,senderID,receiverID,postManID,amount) => {
    const moneyorder = new Moneyorder({sourceBranchID,receivingBranchID,specialCode,senderID,receiverID,postManID,amount})
    return moneyorder.save()
}

exports.del = (id) => {
    return Moneyorder.findByIdAndDelete(id)
}

exports.update = (id,receivingBranchID,specialCode,senderID,receiverID,postManID,amount) => {
    return Moneyorder.updateOne({_id:id},{
        $set: {receivingBranchID,specialCode,senderID,receiverID,postManID,amount}
    })
}

// exports.getOne = (id) => {
//     return Moneyorder.aggregate([
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
//                 amount:1
//             }
//         }
//     ])
// }

exports.getOne = (id) => {
    return Moneyorder.findById(id)
}

exports.updatePostman = (id , postManID) => {
    return Moneyorder.updateOne({_id:id},{
        $set: {postManID,isAssigned: true}
    })
}



exports.filterByDate = (startDate,endDate) => {
    return Moneyorder.find({
        // postManID: postManID,
        createdAt: {
            $gte: startDate,
            $lt: endDate
        }
    })
}

exports.count = () => {
    return Moneyorder.aggregate([
        { 
            $group: { 
                _id: null, 
                cancelled: { $sum: { $cond: [ { $eq: [ "$isCancelled", true ] }, 1, 0 ] } },
                delivered: { $sum: { $cond: [ { $eq: [ "$isDelivered", true ] }, 1, 0 ] } },
                assigned: { $sum: { $cond: [ { $eq: [ "$isAssigned", true ] }, 1, 0 ] } }
            } 
        },
        { 
            $project: { 
                _id: 0 
            } 
        }
    ])
}

exports.countByDate = () => {
    return Moneyorder.aggregate(
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
                    totalcount: { $sum:1 },
                    cancelledcount: { $sum: { $cond: [ { $eq: [ "$isCancelled", true ] }, 1, 0 ] } },
                    deliveredcount: { $sum: { $cond: [ { $eq: [ "$isDelivered", true ] }, 1, 0 ] } },
                    date: { $first: "$createdAt" },
    
                }
            },
            {
                $project:
                {
                    date:
                    {
                        $dateToString: { format: "%m-%d-%Y", date: "$date" }
                    },
                    totalcount: 1,
                    deliveredcount: 1,
                    cancelledcount: 1,
                    _id: 0,
                   
                }
            },
            {
                $sort: {
                  date: 1
                }
            }
        ])
}