const Clerk = require('../../services/postMaster/ClerkService')
const SendMail = require('../../config/Mail')
const bcrypt = require('bcrypt')
const {randomId} = require('../../config/Random')


const getAllClerk = (req,res) => {
    Clerk.findAll()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.send(err)
    })
}

const createClerk =async (req,res) => {
    const branchId = req.user.branchId
    const { username,email,mobileNumber } = req.body
    const password = randomId(10)
    const hashPassword = await bcrypt.hash(password,10)
    Clerk.createClerk(username,hashPassword,email,mobileNumber,branchId)
    .then(result=>{
        res.json(result)
        SendMail(email,password)
    })
    .catch(err=>{
        console.log(err)
    })
}

const deleteClerk = (req,res) => {
    const {id} = req.params
    Clerk.deleteClerk(id)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const updateClerk = (req,res) => {
    const {id} = req.params
    const {username,email,mobileNumber} = req.body
    Clerk.updateClerk(id,username,email,mobileNumber)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const getClerk = (req,res) => {
    const {id} = req.params
    Clerk.getClerk(id)
    .then(result=>{
        console.log(result)
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const getClerkCount = (req,res) => {
    const branchId = req.user.branchId
    Clerk.getClerkCount(branchId)
    .then(result=>{
        res.json(result[0])
    })
    .catch(err=>{
        console.log(err)
    })
}

const changeStatus = (req,res) => {
    const {id} = req.params
    const {status} = req.body
    console.log(req.body)
    Clerk.changeStatus(id,status)
    .then(result=>{
        res.json(result[0])
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports= {
    getAllClerk,
    createClerk,
    deleteClerk,
    updateClerk,
    getClerk,
    getClerkCount,
    changeStatus
}