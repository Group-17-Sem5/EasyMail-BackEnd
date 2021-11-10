const Moneyorder = require('../../models/moneyOrder-model')
const mongoose = require('mongoose')

exports.findAll = () => {
    return Moneyorder.find()
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

exports.create = (senderID,receiverID,sourceBranchID,receivingBranchID,specialCode,amount) => {
    const moneyorder = new Moneyorder({senderID,receiverID,sourceBranchID,receivingBranchID,specialCode,amount})
    return moneyorder.save()
}

exports.del = (id) => {
    return Moneyorder.findByIdAndDelete(id)
}


exports.con = (id , isDelivered) => {
    return Moneyorder.updateOne({_id:id},{
        $set: {isDelivered : !isDelivered}
    })
}

exports.update = (id,senderID,receiverID,sourceBranchID,receivingBranchID,specialCode,amount) => {
    return Moneyorder.updateOne({_id:id},{
        $set: {senderID,receiverID,sourceBranchID,receivingBranchID,specialCode,amount}
    })
}

exports.getOne = (id) => {
    return Moneyorder.findById(id)
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
    return Moneyorder.updateOne({_id:id},{
        $set: {postManID}
    })
}

exports.filterByDate = (startDate,endDate) => {
    return Moneyorder.aggregate(
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


exports.countByDatePostman = (postmanID) => {
    return Moneyorder.aggregate(
        [
            {
                $match: {postmanID:postmanID}
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
    return Moneyorder.aggregate(
        [
            {
                $match: {
                    $and:[{
                        createdAt:{
                            $gte: new Date(startDate),
                            $lt: new Date(endDate)
                        }},
                        
                        {
                            postmanID:postmanID
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