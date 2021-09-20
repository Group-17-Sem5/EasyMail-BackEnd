const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'))
router.use('/postman',require('./postman'))
router.use('/clerk',require('./clerk'))

module.exports = router