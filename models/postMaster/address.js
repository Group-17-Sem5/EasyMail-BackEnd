const mongoose = require('mongoose')
const Shema = mongoose.Schema

const AddressSchema = new Shema({
    address: {
        type: String,
        required: [true, "Address is required"],
        minLength: [6, "Too short"],
        maxLength: [256, "Too Long"]
    },
//     location: {
//         type: "Point",
//         coordinates: [longitude, latitude]
//   }
    
},{ timestamps: true })

const  Address = mongoose.model('Address', AddressSchema);
module.exports = Address;