const Clerk = require('../../services/clerk/AddressService')
const SendMail = require('../../config/Mail')
const bcrypt = require('bcrypt')
const {randomId} = require('../../config/Random')

const getAllAddress = (req,res) => {
    Clerk.findAll()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.send(err)
    })
}

module.exports= {
    getAllAddress
}