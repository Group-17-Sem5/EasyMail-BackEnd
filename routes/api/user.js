const express = require('express');
const User=require('../../models/user-model');
const userController = require('../../controller/userController')
const router=express.Router();
const authorization = require('../../middleware/auth');
const config = require('../../config/config');
const jwt= require('jsonwebtoken');

//Postman profile update
router.post('/login',userController.login);
router.post('/register',userController.register);
router.put('/update-profile',authorization,userController.updateProfile);
router.get('/addresses/:branchID',userController.getAddressesWithBranch);
router.get('/addresses',userController.getAddresses);

//addresses handling by user
router.put('/address-change/:oldAddress',authorization, userController.changeAddress);  


//posts ,money orders and couriers
router.get('/mailbox/:userID',authorization,userController.searchReceivedMails);
router.get('/mailbox/search/:mailID',authorization, userController.getAPost);
router.get('/sent-mails/:userID',authorization,userController.searchSentMails);

router.get('/money-order/:userID',authorization, userController.getMoneyOrdersList); 
router.get('/received-money-order/:userID',authorization, userController.getReceivedMoneyOrdersList); 

router.get('/sent-couriers/:userID',authorization,userController.getSentCouriersList);
router.get('/received-couriers/:userID',authorization,userController.getReceivedCouriersList);

module.exports =router;