const Courier = require('../../services/postMaster/CourierService')
const User = require('../../services/postMaster/UserService')

const getAllCourier = (req,res) => {
    Courier.findAll()
    .then(result=>{
        res.json(result)
        // console.log(result)
    })
    .catch(err=>{
        res.send(err)
    })
}

const createCourier = async (req,res) => { 
    const sourceBranchID = req.user.branchId
    const { lastAppearedBranchID,senderID,receiverID,postManID,weight,courierID,addressID,receivingBranch } = req.body
    if(addressID.length ==0){
        await User.getUser(receiverID)
        .then(resul=>{
            // console.log(resul)
            const addressID = resul[0].addressId
            Courier.create(sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,weight,courierID,addressID,receivingBranch)
                .then(result=>{
                    res.json(result)
                })
                .catch(err=>{
                    console.log(err)
                })
        })
    }
    Courier.create(sourceBranchID,lastAppearedBranchID,senderID,receiverID,postManID,weight,courierID,addressID,receivingBranch)
    .then(result=>{
        // console.log(result)
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const delCourier = (req,res) => {
    const {id} = req.params
    // console.log('id')
    Courier.del(id)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const updateCourier = (req,res) => {
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

const getOneCourier = (req,res) => {
    const {id} = req.params
    Courier.getOne(id)
    .then(result=>{
        res.json(result)
        // console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const updatePostmanCourier = (req,res) => {
    const {id} = req.params
    const {postManID} = req.body
    Courier.updatePostman(id,postManID)
    .then(result=>{
        res.json(result)
        // console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const filterCourier = (req,res) => {
    const {startDate,endDate} = req.body
    // const startDate= "11-01-2021"
    // const endDate= "11-05-2021"
    
    Courier.filterByDate(startDate,endDate)
    .then(result=>{
        res.json(result)
        // console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const countByDateCourier = (req,res) => {
    Courier.countByDate()
    .then(result=>{
        res.json(result)
        // console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const countCourier = (req,res) => {
    Courier.count()
    .then(result=>{
        res.json(result)
        // console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const countByDatePostmanCourier = (req,res) => {
    const {postmanID} = req.params
    Courier.countByDatePostman(postmanID)
    .then(result=>{
        res.json(result)
        // console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const filterPostmanCourier = (req,res) => {
    const {postmanID} = req.params
    const {startDate,endDate} = req.body
    // const startDate= "11-01-2021"
    // const endDate= "11-05-2021"
    
    Courier.filterByDatePostman(startDate,endDate,postmanID)
    .then(result=>{
        res.json(result)
        // console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports= {
    getAllCourier,
    createCourier,
    delCourier,
    updateCourier,
    getOneCourier,
    updatePostmanCourier,
    filterCourier,
    countByDateCourier,
    countCourier,
    countByDatePostmanCourier,
    filterPostmanCourier
}