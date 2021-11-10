const Address = require('../../services/postMaster/AddressService')


const findAll = (req,res) => {
    Address.findAll()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.send(err)
    })
}


module.exports ={
    findAll,
}