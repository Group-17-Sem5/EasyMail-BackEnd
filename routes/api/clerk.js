const express = require('express');
const PostMan=require('../../models/clerk-model');
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

router.post('/add', clerkController.createClerk);
//post handle
router.get('/post', clerkController.searchAddress);
router.post('/post/add', clerkController.addAddress);
router.delete('/post/:id', clerkController.removeAddress);
router.put('/post/:id', clerkController.changeAddress);
//money order
router.get('/moneyOrder',clerkController.getPosts);
router.get('/moneyOrder/:id', clerkController.getAPost);
router.put('/moneyOrder/confirm/:id',clerkController.confirmPostDelivery);
router.put('/moneyOrder/cancel/:id', clerkController.cancelDelivery);

module.exports =router;