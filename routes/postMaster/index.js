const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'))
router.use('/postman',require('../clerk/postman'))
router.use('/clerk',require('./clerk'))
router.use('/post',require('../clerk/post'))
module.exports = router