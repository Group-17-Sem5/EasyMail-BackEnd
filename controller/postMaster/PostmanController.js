const Postman = require('../../services/postMaster/PostmanService')
const SendMail = require('../../config/Mail')
const bcrypt = require('bcrypt')
const {randomId} = require('../../config/Random')


const getAllPostman = (req,res) => {
    Postman.findAll()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.send(err)
    })
}

const createPostman =async (req,res) => {
    const branchId = req.user.branchId
    const {username,email,mobileNumber,area } = req.body
    const password = randomId(10)
    const hashPassword = await bcrypt.hash(password,10)
    Postman.createPostman(username,hashPassword,email,mobileNumber,area,branchId)
    .then(result=>{
        res.json(result)
        SendMail(email,password)
    })
    .catch(err=>{
        res.json()
        console.log('this is error message => ' + err)
    })
}

const deletePostman = (req,res) => {
    const {id} = req.params
    Postman.deletePostman(id)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const updatePostman = (req,res) => {
    const {id} = req.params
    const {username,email,mobileNumber,area} = req.body
    Postman.updatePostman(id,username,email,mobileNumber,area)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const getPostman = (req,res) => {
    const {id} = req.params
    Postman.getPostman(id)
    .then(result=>{
        res.json(result)
        console.log(result.username)
    })
    .catch(err=>{
        console.log(err)
    })
}

const getPostmanCount = (req,res) => {
    const branchID = req.user.branchID
    console.log(req.user)
    Postman.getPostmanCount(branchID)
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
    Postman.changeStatus(id,status)
    .then(result=>{
        res.json(result[0])
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports= {
    getAllPostman,
    createPostman,
    deletePostman,
    updatePostman,
    getPostman,
    getPostmanCount,
    changeStatus
}