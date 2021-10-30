const Moneyorder = require('../../services/postmaster/MoneyorderService')


const getAll = (req,res) => {
    Moneyorder.findAll()
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
    const { lastAppearedBranchID,senderID,receiverID,postManID,amount } = req.body
    Moneyorder.create(sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,amount)
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
    Moneyorder.del(id)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const update = (req,res) => {
    const {id} = req.params
    const { lastAppearedBranchID,senderID,receiverID,postManID,amount } = req.body
    Moneyorder.update(id,lastAppearedBranchID,senderID,receiverID,postManID,amount)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const getOne = (req,res) => {
    const {id} = req.params
    Moneyorder.getOne(id)
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
    Moneyorder.updatePostman(id,postManID)
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