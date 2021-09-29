const User = require('../../models/postMaster/user')
const mongoose = require('mongoose')

exports.findByEmail = (email) => {
    return User.findOne({email})
}

exports.findAll = () => {
    return User.aggregate([
        {
            $lookup: {
                from: "addresses",
                localField: 'addressId',
                foreignField: '_id',
                as: "_address"
            }
        },
        {
            $project: {
                _id: '$_id',
                name: '$name',
                email: "$email",
                mobileNumber: '$mobileNumber',
                address: { $arrayElemAt: ['$_address.address', 0] },
            }
        }
    ])
}

// exports.findAll = () => {
//     return User.find()
// }

exports.create = ( email, mobileNumber, addressId,hashPassword, name ) => {
    const user = new User({ email, mobileNumber, addressId,password:hashPassword, name })
    return user.save()
}

exports.del = (id) => {
    return User.findByIdAndDelete(id)
}

exports.update = (id,email, mobileNumber,name) => {
    return User.updateOne({_id:id},{
        $set: {email, mobileNumber,name}
    })
}

exports.getOne = (id) => {
    return User.aggregate([
        {
            $match: {_id:mongoose.Types.ObjectId(id)}
        },
        {
            $lookup: {
                from: "addresses",
                localField: 'addressId',
                foreignField: '_id',
                as: "_address"
            }
        },
        {
            $project: {
                _id: '$_id',
                name: '$name',
                email: "$email",
                mobileNumber: '$mobileNumber',
                address: { $arrayElemAt: ['$_address.address', 0] },
            }
        }
    ])
}

exports.getAddressId = (id) => {
    return User.aggregate([
        {
            $match: {_id:mongoose.Types.ObjectId(id)}
        },
        {
            $project: {
               addressId:1,
               _id:0
            }
        }
    ])
}