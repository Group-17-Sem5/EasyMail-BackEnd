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


//addresses handling by user
//router.put('/address-change/:userID',authorization, userController.changeAddress);  //! check later


//posts ,money orders and couriers
router.get('/mailbox/:userID',authorization,userController.searchReceivedMails);
router.get('/mailbox/search/:userID',authorization, userController.getAPost);
router.get('/sent-mails/:userID',authorization,userController.searchSentMails);
router.get('/money-order/:userID',authorization, userController.getMoneyOrdersList); //!check later
router.get('couriers/:userID',authorization,userController.trackCourier);  //!check later

module.exports =router;