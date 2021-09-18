const express = require('express');
const router = express.Router();

router.use('/postman',require('./postman'))

module.exports = router