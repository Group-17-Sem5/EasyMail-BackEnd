const Post = require('../../services/postmaster/PostService')


const getAll = (req,res) => {
    Post.findAll()
    .then(result=>{
        res.json(result)
        console.log(result)
    })
    .catch(err=>{
        res.send(err)
    })
}

const create = (req,res) => { 
    const sourceBranchID = req.user.branchId
    const { receivingBranchID,lastAppearedBranchID,senderID,receiverID,postManID,addressID } = req.body
    Post.create(receivingBranchID,sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,addressID)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const del = (req,res) => {
    const {id} = req.params
    console.log('id')
    Post.del(id)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const update = (req,res) => {
    const {id} = req.params
    const { receivingBranchID,lastAppearedBranchID,senderID,receiverID,postManID,addressID } = req.body
    Post.update(id,receivingBranchID,lastAppearedBranchID,senderID,receiverID,postManID,addressID)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const getOne = (req,res) => {
    const {id} = req.params
    Post.getOne(id)
    .then(result=>{
        res.json(result)
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const updatePostman = (req,res) => {
    const {id} = req.params
    const {postManID} = req.body
    Post.updatePostman(id,postManID)
    .then(result=>{
        res.json(result)
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports= {
    getAll,
    create,
    del,
    update,
    getOne,
    updatePostman
}