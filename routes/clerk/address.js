const express = require('express');
const router = express.Router();
const postManController = require('../../controller/clerk/AddressController');
const {ifLogin} = require('../../config/auth')

router.get('/',ifLogin, postManController.getAllAddress);

module.exports = router;