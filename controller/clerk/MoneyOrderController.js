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
    
    const { senderID,receiverID,sourceBranchID,receivingBranchID,specialCode,amount } = req.body
    Moneyorder.create(senderID,receiverID,sourceBranchID,receivingBranchID,specialCode,amount)
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
    const {senderID,receiverID,sourceBranchID,receivingBranchID,specialCode,amount } = req.body
    Moneyorder.update(id,senderID,receiverID,sourceBranchID,receivingBranchID,specialCode,amount)
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

const filter = (req,res) => {
    const {startDate,endDate} = req.body
    // const startDate= "11-01-2021"
    // const endDate= "11-05-2021"
    
    Moneyorder.filterByDate(startDate,endDate)
    .then(result=>{
        res.json(result)
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const countByDate = (req,res) => {
    Moneyorder.countByDate()
    .then(result=>{
        res.json(result)
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const count = (req,res) => {
    Moneyorder.count()
    .then(result=>{
        res.json(result)
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const countByDatePostman = (req,res) => {
    const {postmanID} = req.params
    Moneyorder.countByDatePostman(postmanID)
    .then(result=>{
        res.json(result)
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const filterPostman = (req,res) => {
    const {postmanID} = req.params
    const {startDate,endDate} = req.body
    // const startDate= "11-01-2021"
    // const endDate= "11-05-2021"
    
    Moneyorder.filterByDatePostman(startDate,endDate,postmanID)
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
    updatePostman,
    filter,
    countByDate,
    count,
    filterPostman,
    countByDatePostman
}