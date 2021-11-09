const Courier = require('../../services/clerk/CourierService')


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
   
    const { senderID,receiverID,postManID,sourceBranchID,lastAppearedBranchID,receivingBranchID,addressID,weight } = req.body
    Courier.create(senderID,receiverID,postManID,sourceBranchID,lastAppearedBranchID,receivingBranchID,addressID,weight )
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
    const { courierID,senderID,receiverID,postManID,addressID,lastAppearedBranchID,receivingBranchID,weight } = req.body
    Courier.update(id,courierID,senderID,receiverID,postManID,addressID,lastAppearedBranchID,receivingBranchID,weight)
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
    Courier.updatePostman(id,postManID)
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
    
    Courier.filterByDate(startDate,endDate)
    .then(result=>{
        res.json(result)
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const countByDate = (req,res) => {
    Courier.countByDate()
    .then(result=>{
        res.json(result)
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const count = (req,res) => {
    Courier.count()
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
    Courier.countByDatePostman(postmanID)
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
    
    Courier.filterByDatePostman(startDate,endDate,postmanID)
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
    updatePostman,
    filter,
    countByDate,
    count,
    countByDatePostman,
    filterPostman
}