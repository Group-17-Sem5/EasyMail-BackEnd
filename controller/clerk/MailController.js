const Mail = require('../../services/clerk/MailService')


const getAll = (req,res) => {
    Mail.findAll()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.send(err)
    })
}

const create =async (req,res) => {
 
    const { senderID,receiverID,addressID,postManID,lastAppearedBranchID,sourceBranchID,receivingBranchID } = req.body
    Mail.create(senderID,receiverID,addressID,postManID,lastAppearedBranchID,sourceBranchID,receivingBranchID)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const del = (req,res) => {
    const {id} = req.params
    Mail.del(id)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const update = (req,res) => {
    const {id} = req.params
    const { senderID,receiverID,addressID,postManID,lastAppearedBranchID,sourceBranchID,receivingBranchID } = req.body
    Mail.update(id, senderID,receiverID,addressID,postManID,lastAppearedBranchID,sourceBranchID,receivingBranchID)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const getOne = (req,res) => {
    const {id} = req.params
    Mail.getOne(id)
    .then(result=>{
        res.json(result[0])
        console.log(result[0])
    })
    .catch(err=>{
        console.log(err)
    })
}

const filter = (req,res) => {
    const {startDate,endDate} = req.body
    // const startDate= "11-01-2021"
    // const endDate= "11-05-2021"
    
    Mail.filterByDate(startDate,endDate)
    .then(result=>{
        res.json(result)
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}
const countByDate = (req,res) => {
    Mail.countByDate()
    .then(result=>{
        res.json(result)
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const count = (req,res) => {
    Mail.count()
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
    Mail.countByDatePostman(postmanID)
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
    
    Mail.filterByDatePostman(startDate,endDate,postmanID)
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
    filter,
    countByDate,
    count,
    countByDatePostman,
    filterPostman
    
}