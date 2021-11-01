// const { string } = require('joi');
// const mongoose = require('mongoose')
// const Shema = mongoose.Schema

// const UserSchema = new Shema({
//     email: {
//         type: String,
//         unique: true,
//         validate: {
//             validator: function(v) {
//                 return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
//             },
//             message: "Please enter a valid email"
//         },
//     },
//     password: {
//         type: String,
//         required: [true,"password is required"],
//         minLength: [2, "Too short"],
//         maxLength: [256, "Too Long"]
//     },
//     mobileNumber: {
//         type: String,
//         required: [true,"mobile number is required"],
//         minLength: [9, "Too short"],
//         maxLength: [10, "Too Long"]
//     },
//     addressID: {
//         type: String,
//         ref: 'Address',
//         required: true
//     },
//     username: {
//         type: String,
//         required: [true,"username is required"],
//         validate:{
//             validator: name => /^[a-zA-Z0-9\s]*$/.test(name),
//             message:"Name only contain space and letters"
//         }
//     },
//     branchID: {
//         type: String,
//         ref: 'Branch'
//     }
// },{ timestamps: true })

// const  User = mongoose.model('User', UserSchema);
// module.exports = User;