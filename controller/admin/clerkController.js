const Clerk = require('../../services/admin/clerkService')
const SendMail = require('../../config/Mail')
const bcrypt = require('bcrypt')
const {randomId} = require('../../config/Random')


const getAll = (req,res) => {
    Clerk.findAll()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.send(err)
    })
}

const create =async (req,res) => {
    const { username,mobileNumber,branchId,email } = req.body
    const password = randomId(10)
    const hashPassword = await bcrypt.hash(password,10)
    Clerk.create(username,hashPassword,mobileNumber,branchId,email)
    .then(result=>{
        res.json(result)
        SendMail(email,password)
    })
    .catch(err=>{
        console.log(err)
    })
}

const del = (req,res) => {
    const {id} = req.params
    Clerk.del(id)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const update = (req,res) => {
    const {id} = req.params
    const {username,mobileNumber,email} = req.body
    Clerk.update(id,username,mobileNumber,email)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const getOne = (req,res) => {
    const {id} = req.params
    Clerk.getOne(id)
    .then(result=>{
        res.json(result)
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
    getOne
}