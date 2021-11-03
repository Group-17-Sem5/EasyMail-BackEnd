const User = require('../../models/user-model')
const mongoose = require('mongoose')

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