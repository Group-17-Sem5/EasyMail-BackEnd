const Address = require('../../models/address-model')


exports.findAll = () => {
    return Address.find()
}

exports.create = (addressID,address) => {
    const addresses = new Address({addressID,description:address})
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