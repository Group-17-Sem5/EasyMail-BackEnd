const Mail = require('../../models/mail-model')
const mongoose = require('mongoose')

exports.findAll = () => {
    return Mail.find()
    //return Mail.aggregate([
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
    //             localField: 'lastAppearedBranchID',
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
    //     {
    //         $project: {
    //             _id: '$_id',
    //             senderID: { $arrayElemAt: ['$_users.userName', 0] },
    //             receiverID: { $arrayElemAt: ['$_user.userName', 0] },
    //             lastAppearedBranchID: { $arrayElemAt: ['$_branches.branchName', 0] },
    //             sourceBranchID:1,
    //             postManID: { $arrayElemAt: ['$_postman.userName', 0] },
    //             state:1
    //         }
    //     }
    // ])
}

exports.create = (sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,addressID) => {
    const mail = new Mail({sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,addressID})
    return mail.save()
}

exports.del = (id) => {
    return Mail.findByIdAndDelete(id)
}

exports.update = (id,lastAppearedBranchID,senderID,receiverID,postManID,addressID) => {
    return Mail.updateOne({_id:id},{
        $set: {lastAppearedBranchID,senderID,receiverID,postManID,addressID}
    })
}

// exports.getOne = (id) => {
//     return Mail.aggregate([
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
//                  _id: '$_id',
//                 senderName: { $arrayElemAt: ['$_users.userName', 0] },
//                 senderID: 1,
//                 senderPhone: { $arrayElemAt: ['$_users.mobileNumber', 0] },
//                 // senderAddress: { $arrayElemAt: ['$_usersAddress.address', 0] },
//                 // receiverAddress: { $arrayElemAt: ['$_userAddress.address', 0] },
//                 receiverName: { $arrayElemAt: ['$_user.userName', 0] },
//                 receiverID: 1,
//                 receiverPhone: { $arrayElemAt: ['$_user.mobileNumber', 0] },
//                 lastAppearedBranchName: { $arrayElemAt: ['$_branches.branchName', 0] },
//                 lastAppearedBranchID: 1,
//                 sourceBranchID:1,
//                 postManName: { $arrayElemAt: ['$_postman.userName', 0] },
//                 postManID: 1,
//                 addressID :1,
//                 isAssigned:1,
//                 isCancelled:1,
//                 isDelivered:1
//             }
//         }
//     ])
// }

exports.getOne = (id) => {
    return Mail.findById(id)
}

exports.updatePostman = (id , postManID) => {
    return Mail.updateOne({_id:id},{
        $set: {postManID}
    })
}

exports.filterByDate = (startDate,endDate) => {
    return Mail.find({
        // postManID: postManID,
        createdAt: {
            $gte: startDate,
            $lt: endDate
        }
    })
}

exports.count = () => {
    return Mail.aggregate([
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
    return Mail.aggregate(
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