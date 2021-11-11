const mongoose = require('mongoose')
const User = require('../../models/user-model')


exports.findByEmail = (email) => {
    return User.findOne({email})
}

// exports.findAll = () => {
//     return User.aggregate([
//         {
//             $lookup: {
//                 from: "addresses",
//                 localField: 'addressId',
//                 foreignField: '_id',
//                 as: "_address"
//             }
//         },
//         {
//             $project: {
//                 _id: '$_id',
//                 name: '$name',
//                 email: "$email",
//                 mobileNumber: '$mobileNumber',
//                 address: { $arrayElemAt: ['$_address.address', 0] },
//             }
//         }
//     ])
// }

exports.findAll = () => {
    return User.find()
}
// exports.findAll = () => {
//     return User.find()
// }

exports.create = ( email, mobileNumber, addressID,hashPassword,userName,branchID ) => {
    const user = new User({ email, mobileNumber, addressID,hashPassword,userName,branchID })
    return user.save()
}

exports.del = (id) => {
    return User.findByIdAndDelete(id)
}

exports.update = (id,email, mobileNumber) => {
    return User.updateOne({_id:id},{
        $set: {email, mobileNumber}
    })
}

// exports.getOne = (id) => {
//     return User.aggregate([
//         {
//             $match: {_id:mongoose.Types.ObjectId(id)}
//         },
//         {
//             $lookup: {
//                 from: "addresses",
//                 localField: 'addressId',
//                 foreignField: '_id',
//                 as: "_address"
//             }
//         },
//         {
//             $project: {
//                 _id: '$_id',
//                 name: '$name',
//                 email: "$email",
//                 mobileNumber: '$mobileNumber',
//                 address: { $arrayElemAt: ['$_address.address', 0] },
//             }
//         }
//     ])
// }

exports.getOne = (id) => {
    return User.findById(id)
}

exports.getAddressId = (id) => {
    return User.aggregate([
        {
            $match: {_id:mongoose.Types.ObjectId(id)}
        },
        {
            $project: {
               addressID:1,
               _id:0
            }
        }
    ])
}

exports.getUser = (userID) => {
    return User.aggregate([
        {
            $match: {userName:userID}
        },
        {
            $lookup: {
                from: "addresses",
                localField: 'addressId',
                foreignField: 'addressID',
                as: "_address"
            }
        },
        {
            $project: {
               addressID:1,
               _id:0,
               mobileNumber:1,
               email:1,
               userName:1,
               addressId:1,
               address: { $arrayElemAt: ['$_address.description', 0] },
               lat: { $arrayElemAt: ['$_address.lat', 0] },
               lng: { $arrayElemAt: ['$_address.lng', 0] }
            }
        }
    ])
}