const mongoose = require('mongoose')
const Clerk = require('../../models/clerk')

exports.findAll = () => {
    return Clerk.find()
}

exports.createClerk = (username,hashPassword,email,mobileNumber,branchID) => {
    const clerk = new Clerk({username,password:hashPassword,email,mobileNumber,branchID})
    return clerk.save()
}

exports.deleteClerk = (id) => {
    return Clerk.findByIdAndDelete(id)
}

exports.updateClerk = (id,username,email,mobileNumber) => {
    return Clerk.updateOne({_id:id},{
        $set: {username,email,mobileNumber}
    })
}

exports.getClerk = (id) => {
    return Clerk.findById(id)
}

exports.getClerkCount = (branchId) => {
    return Clerk.aggregate([
        {
            $match:{branchID:(branchID)}
        },
        {
            $count:"clerkCount"
        }
    ])
}

exports.changeStatus = (id , status) => {
    return Clerk.updateOne({_id:id},{
        $set: {status:!status}
    })
}