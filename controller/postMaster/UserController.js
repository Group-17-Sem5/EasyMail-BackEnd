const User = require('../../services/postMaster/UserService')
const Address = require('../../services/postMaster/AddressService')
const SendMail = require('../../config/Mail')
const bcrypt = require('bcrypt')
const {randomId} = require('../../config/Random')


const getAll = (req,res) => {
    User.findAll()
    .then(result=>{
        res.json(result)
        console.log(result)
    })
    .catch(err=>{
        res.send(err)
    })
}

const create =async (req,res) => {console.log('asmb')
    const { email, mobileNumber, name,address } = req.body
    const password = randomId(10)
    const hashPassword = await bcrypt.hash(password,10)
    console.log("s"+address)
    await Address.create(address)
    .then(resul=>{
        const addressId = resul._id
        User.create(email, mobileNumber, addressId,hashPassword,name)
        .then(result=>{
            res.json(result)
            email && SendMail(email,password)
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

const del = (req,res) => {
    const {id} = req.params
    User.del(id)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const update = (req,res) => {
    const {id} = req.params
    const { email, mobileNumber, addressId } = req.body
    User.update(id,email, mobileNumber, addressId)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const getOne = (req,res) => {
    const {id} = req.params
    User.getOne(id)
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