const express = require('express');
const clerk =require('../../models/clerk-model');
const clerkController = require('../../controller/clerkController');
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

//router.post('/add', clerkController.createClerk);
//post handle
router.get('/address', clerkController.searchAddress);
router.post('/address/add', clerkController.addAddress);
router.delete('/address/:id', clerkController.removeAddress);
router.put('/address/:id', clerkController.changeAddress);
//money order
router.get('/posts',clerkController.getPosts);
router.get('/posts/:id', clerkController.getAPost);
router.put('/posts/confirm/:id',clerkController.confirmPostDelivery);
router.put('/posts/cancel/:id', clerkController.cancelDelivery);

module.exports =router;