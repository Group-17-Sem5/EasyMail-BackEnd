const Post = require('../../models/postMaster/post')


exports.findAll = () => {
    return Post.find()
}

exports.create = (sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID) => {
    const post = new Post({sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID})
    return post.save()
}

exports.del = (id) => {
    return Post.findByIdAndDelete(id)
}

exports.update = (id,lastAppearedBranchID,senderID,receiverID,postManID) => {
    return Post.updateOne({_id:id},{
        $set: {lastAppearedBranchID,senderID,receiverID,postManID}
    })
}

exports.getOne = (id) => {
    return Post.findById(id)
}