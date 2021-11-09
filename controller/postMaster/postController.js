const Post = require('../../services/postMaster/PostService')


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


const filter = (req,res) => {
    const {startDate,endDate} = req.body
    // const startDate= "11-01-2021"
    // const endDate= "11-05-2021"
    
    Post.filterByDate(startDate,endDate)
    .then(result=>{
        res.json(result)
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const countByDate = (req,res) => {
    Post.countByDate()
    .then(result=>{
        res.json(result)
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const count = (req,res) => {
    Post.count()
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
    Post.countByDatePostman(postmanID)
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
    
    Post.filterByDatePostman(startDate,endDate,postmanID)
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