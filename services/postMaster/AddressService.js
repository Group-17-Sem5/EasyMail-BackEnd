const Address = require('../../models/postMaster/address')


exports.findAll = () => {
    return Address.find()
}

exports.create = (address) => {
    const addresses = new Address({address})
    return addresses.save()
}

exports.del = (id) => {
    return Address.findByIdAndDelete(id)
}

exports.update = (addressId,address) => {
    return Address.updateOne({_id:addressId},{
        $set: {address}
    })
}

exports.getOne = (id) => {
    return Address.findById(id)
}