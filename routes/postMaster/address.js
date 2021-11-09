const express = require('express');
const router = express.Router();
const postManController = require('../../controller/postManController');
const {ifLogin} = require('../../config/auth')

router.get('/',ifLogin, postManController.searchAddress);

module.exports = router;