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

const create =async (req,res) => {console.log(req.user)
    const { email, mobileNumber, name,address } = req.body
    const password = randomId(10)
    const hashPassword = await bcrypt.hash(password,10)
    await Address.create(address)
    .then(resul=>{
        const addressId = resul._id
        User.create(email, mobileNumber, addressId,hashPassword,name)
        .then(result=>{
            res.json(result)
            email && SendMail(email,password)
        })
        .catch(err=>{
            res.json(err)
            console.log(err)
        })
    })
    .catch(err=>{
        res.json(err)
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

const update =async (req,res) => {
    const {id} = req.params
    const addressId = await User.getAddressId(id)
    console.log(addressId[0].addressId)
    const { email, mobileNumber, address,name } = req.body
    Address.update(addressId[0].addressId,address)
    .then(resul=>{
        User.update(id,email, mobileNumber,name)
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

const getOne = (req,res) => {
    const {id} = req.params
    User.getOne(id)
    .then(result=>{
        res.json(result[0])
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