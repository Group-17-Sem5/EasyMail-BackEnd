const Moneyorder = require('../../services/clerk/MoneyOrderService')


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
    const  specialCode = randomId(10)
    const { senderID,receiverID,postManID,amount } = req.body
    Moneyorder.create(sourceBranchID,senderID,receiverID,postManID,amount,specialCode)
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

const con = (req,res) => {
    const {id} = req.params
    console.log('id')
    const{isDelivered} = req.body
    Moneyorder.con(id,isDelivered)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const update = (req,res) => {
    const {id} = req.params
    const {senderID,receiverID,amount,specialCode,sourceBranchID } = req.body
    Moneyorder.update(id,senderID,receiverID,amount,specialCode,sourceBranchID)
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
    con,
    update,
    getOne,
    updatePostman
}