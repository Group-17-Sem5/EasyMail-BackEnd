const Postman = require('../../models/postMan-model')

exports.findAll = () => {
    return Postman.find()
}

exports.createPostman = (username,hashPassword,email,mobileNumber,area) => {
    const postman = new Postman({username,password:hashPassword,email,mobileNumber,area})
    return postman.save()
}

exports.deletePostman = (id) => {
    return Postman.findByIdAndDelete(id)
}

exports.updatePostman = (id,username,email,mobileNumber,area) => {
    return Postman.updateOne({_id:id},{
        $set: {username,email,mobileNumber,area}
    })
}

exports.getPostman = (id) => {
    return Postman.findById(id)
}