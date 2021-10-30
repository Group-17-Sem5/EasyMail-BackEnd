const Courier = require('../../services/postmaster/CourierService')


const getAll = (req,res) => {
    Courier.findAll()
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
    const { lastAppearedBranchID,senderID,receiverID,postManID,weight,courierID,addressID,receivingBranch } = req.body
    Courier.create(sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,weight,courierID,addressID,receivingBranch)
    .then(result=>{
        console.log(result)
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const del = (req,res) => {
    const {id} = req.params
    console.log('id')
    Courier.del(id)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const update = (req,res) => {
    const {id} = req.params
    const { sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,weight,addressID,receivingBranch } = req.body
    Courier.update(id,sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,weight,addressID,receivingBranch)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const getOne = (req,res) => {
    const {id} = req.params
    Courier.getOne(id)
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
    Courier.updatePostman(id,postManID)
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