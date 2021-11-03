const express = require('express');
const router = express.Router();
const postManController = require('../../controller/postManController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin, postManController.searchAddress);

module.exports = router;