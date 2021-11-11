const express = require('express');
const router = express.Router();
const addressController = require('../../controller/postMaster/AddressController')
const postManController = require('../../controller/postManController');
const {ensureLogin} = require('../../config/auth')

router.get('/', addressController.findAll);

module.exports = router;