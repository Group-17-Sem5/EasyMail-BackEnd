const express = require('express');
const PostMan=require('../../models/postMan-model');
const postManController = require('../../controller/postManController');
const router=express.Router();
// router.route('/register').post((req, res) => {
//     console.log('Registering');
//     const postMan=new PostMan({
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email,
//     });
//     postMan
//     .save()
//     .then(() => {
//         console.log('postMan registered');
//         res.status(200).json('Ok');
//     }).catch((err) => {
//         res.status(403).json({msg:err});
//     });

// });
// router.route('/delete/:userName').delete((req,res) => {
//     console.log('deleting');
//     PostMan.findOneAndUpdate(
//         {userName:req.params.userName},
//         {$set:{password: req.body.password}},
//         (err,result) => {
//             if(err) return res.status(500).json({msg:err});
//             const msg={
//                 msg:'password Sucessfully updated',
//                 userName:req.params.userName,
//             };
//             return res.json(msg);
//         });
        

// });
// router.route('/update/:userName').patch((req,res) => {
//     console.log('deleting');
    
// });
router.get('/address', postManController.searchAddress);
router.post('/address/add', postManController.addAddress);
router.delete('/address/:id', postManController.removeAddress);
router.put('/address/:id', postManController.confirmPostDelivery);

module.exports =router;