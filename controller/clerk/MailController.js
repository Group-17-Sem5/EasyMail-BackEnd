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
    const sourceBranchID = req.user.branchId
    const { lastAppearedBranchID,senderID,receiverID,postManID,addressID } = req.body
    Mail.create(sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,addressID)
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
    const { sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,addressID } = req.body
    Mail.update(id,sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,addressID)
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
    // const {startDate,endDate} = req.body
    const startDate= "11-01-2021"
    const endDate= "11-05-2021"
    
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


module.exports= {
    getAll,
    create,
    del,
    update,
    getOne,
    filter,
    countByDate,
    count

    
}