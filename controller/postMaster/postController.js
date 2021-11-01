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
    const { lastAppearedBranchID,senderID,receiverID,postManID } = req.body
    Post.create(sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID)
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
    const { lastAppearedBranchID,senderID,receiverID,postManID } = req.body
    Post.update(id,lastAppearedBranchID,senderID,receiverID,postManID)
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
        res.json(result[0])
        console.log(result[0])
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