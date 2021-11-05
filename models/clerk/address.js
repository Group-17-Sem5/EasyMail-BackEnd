const mongoose = require('mongoose')
const Shema = mongoose.Schema

const AddressSchema = new Shema({
    addressID: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    branchID: {
        type: String,
        required: true,
    },
    lat: {
        type: String,
        required: true,
    },
    lat: {
        type: String,
        required: true,
    },

//     location: {
//         type: "Point",
//         coordinates: [longitude, latitude]
//   }
    
},{ timestamps: true })

const  Address = mongoose.model('Address', AddressSchema);
module.exports = Address;