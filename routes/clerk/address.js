const express = require('express');
const router = express.Router();
const postManController = require('../../controller/clerk/AddressController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin, postManController.getAllAddress);

module.exports = router;