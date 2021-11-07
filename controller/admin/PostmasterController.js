const Postmaster = require('../../services/admin/PostmasterService')
const SendMail = require('../../config/Mail')
const bcrypt = require('bcrypt')
const {randomId} = require('../../config/Random')


const getAll = (req,res) => {
    Postmaster.findAll()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.send(err)
    })
}

const create =async (req,res) => {

    const { username,mobileNumber,branchID,email } = req.body
    const password = randomId(10)
    console.log(password)
    const hashPassword = await bcrypt.hash(password,10)
    Postmaster.create(username,hashPassword,mobileNumber,branchID,email)

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
    Postmaster.del(id)
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
    Postmaster.update(id,username,mobileNumber,email)

    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const getOne = (req,res) => {
    const {id} = req.params
    Postmaster.getOne(id)
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