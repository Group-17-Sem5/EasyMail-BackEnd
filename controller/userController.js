const User = require('../models/User')
const bcrypt = require('bcrypt')


const listAll = (req,res) => {
    User.listUsers()
    .then(result => {
        res.json(result)
    })
    .catch(console.log())
}

const create = async (req,res) =>{
    const {name, address, mobile, NIC, username, password, type} = req.body
    const hashPassword = await bcrypt.hash(password,10)
    User.createUser(name, address, mobile, NIC, username, hashPassword, type)
    .then(result => {
        res.json(result)
    })
    .catch(console.log())
}

const editUsers = (req,res) => {
    const {id} = req.params
    const {name, address, mobile, NIC, username} = req.body
    User.editUser(id,name, address, mobile, NIC, username)
    .then(result => {
        res.json(result)
    })
    .catch(console.log())
}

const deleteUsers = (req,res) => {
    const {id} = req.params
    User.deleteOne(id)
    .then(result => {
        res.json(result)
    })
    .catch(console.log())
}

module.exports = {
    listAll,
    create,
    editUsers,
    deleteUsers,
}