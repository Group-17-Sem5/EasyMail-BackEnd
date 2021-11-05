const Address = require('../../models/address-model')


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

exports.update = (id,address) => {
    return Address.updateOne({_id:id},{
        $set: {address}
    })
}

exports.getOne = (id) => {
    return Address.findById(id)
}