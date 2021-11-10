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

exports.create = (senderID,receiverID,postManID,sourceBranchID,lastAppearedBranchID,receivingBranchID,addressID,weight) => {
    const courier = new Courier({senderID,receiverID,postManID,sourceBranchID,lastAppearedBranchID,receivingBranchID,addressID,weight })
    return courier.save()
}

exports.del = (id) => {
    return Courier.findByIdAndDelete(id)
}

exports.con = (id , isDelivered) => {
    return Courier.updateOne({_id:id},{
        $set: {isDelivered : !isDelivered}
    })
}

exports.update = (id,courierID,senderID,receiverID,postManID,addressID,lastAppearedBranchID,receivingBranchID,weight ) => {
    return Courier.updateOne({_id:id},{
        $set: {courierID,senderID,receiverID,postManID,addressID,lastAppearedBranchID,receivingBranchID,weight }
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
    return Courier.aggregate(
        [
            {
                $match: {
                    createdAt:{
                        $gte: new Date(startDate),
                        $lt: new Date(endDate)
                    }
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

exports.count = () => {
    return Courier.aggregate([
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


exports.countByDatePostman = (postmanID) => {
    return Courier.aggregate(
        [
            {
                $match: {postManID:postmanID}
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

exports.filterByDatePostman = (startDate,endDate,postmanID) => {
    return Courier.aggregate(
        [
            {
                $match: {
                    $and:[{
                        createdAt:{
                            $gte: new Date(startDate),
                            $lt: new Date(endDate)
                        }},
                        
                        {
                            postManID:postmanID
                        }
                    ]
                    
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