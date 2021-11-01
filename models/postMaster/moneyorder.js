// const mongoose = require('mongoose')
// const Shema = mongoose.Schema

// const MoneyorderSchema = new Shema({
//     moneyOrderID:{
//         type:String, 
//         required: true,
//         unique: true,
//     },specialCode:{
//         type:String, 
//         required: true,
//         unique: true,
//     },sourceBranch:{
//         type:String, 
//         required: true,
//         ref: 'Branch'
//     },receivingBranch:{
//         type:String, 
//         required: true,
//         ref: 'Branch'
//     },senderID:{
//         type:String,
//         required:true,
//         ref: 'User'
//     },receiverID:{
//         type:String,
//         required:true,
//         ref: 'User'
//     },isDelivered:{
//         type: Boolean,
//         required:true,
//     },isCancelled:{
//         type:Boolean,
//         required:true,
//     },amount: {
//         type: Number,
//         required: [true,"amount is required"],
//         validate: {
//             validator: weight => weight>0,
//             message: "Incorrect value for amount"
//         }
//     }
// },{ timestamps: true })

// const  Moneyorder = mongoose.model('Moneyorder', MoneyorderSchema);
// module.exports = Moneyorder;