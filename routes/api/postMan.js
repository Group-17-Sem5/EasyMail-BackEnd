const express = require('express');
const PostMan=require('../../models/postMan-model');
const postManController = require('../../controller/postManController');
const router=express.Router();
const authorization = require('../../middleware/auth');
const config = require('../../config/config');
const jwt= require('jsonwebtoken');

//Postman profile update
router.post('/login',postManController.login);

//addresses handling postman
router.get('/address',authorization, postManController.searchAddress);
router.get('/address/:addressID',authorization, postManController.getOneAddress);
router.post('/address/add',authorization, postManController.addAddress);
router.delete('/address/:id',authorization, postManController.removeAddress);
router.put('/address/:id',authorization, postManController.changeAddress);
router.put('/address/update/:id',authorization, postManController.updateAddress);
//deliveries handling postman 
router.get('/posts/:postManId',authorization,postManController.getPosts);
router.get('/delivered-posts/:postManId',authorization,postManController.getDeliveredPosts);
router.get('/cancelled-posts/:postManId',authorization,postManController.getCancelledPosts);
router.get('/posts/search/:id',authorization, postManController.getAPost);
router.put('/posts/confirm/:id',authorization,postManController.confirmPostDelivery);
router.put('/posts/cancel/:id',authorization, postManController.cancelDelivery);


module.exports =router;