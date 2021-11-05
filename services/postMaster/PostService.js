const Post = require('../../models/mail-model')
const mongoose = require('mongoose')
const { TOO_MANY_REQUESTS } = require('http-status')

// exports.findAll = () => {
//     return Post.aggregate([
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
//                 state:1
//             }
//         }
//     ])
// }

exports.findAll = () => {
    return Post.find()
}

exports.create = (receivingBranchID,sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,addressID) => {
    const post = new Post({receivingBranchID,sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,addressID})
    return post.save()
}

exports.del = (id) => {
    return Post.findByIdAndDelete(id)
}

exports.update = (id,receivingBranchID,lastAppearedBranchID,senderID,receiverID,postManID,addressID) => {
    return Post.updateOne({_id:id},{
        $set: {receivingBranchID,lastAppearedBranchID,senderID,receiverID,postManID,addressID}
    })
}

// exports.getOne = (id) => {
//     return Post.aggregate([
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
//             }
//         }
//     ])
// }

exports.getOne = (id) => {
    return Post.findById(id)
}

exports.updatePostman = (id , postManID) => {
    return Post.updateOne({_id:id},{
        $set: {postManID, isAssigned: true}
    })
}


exports.filterByDate = (startDate,endDate) => {
    return Post.find({
        // postManID: postManID,
        createdAt: {
            $gte: startDate,
            $lt: endDate
        }
    })
}

exports.count = () => {
    return Post.aggregate([
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
    return Post.aggregate(
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