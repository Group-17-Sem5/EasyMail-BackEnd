const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'))
router.use('/post',require('./post'))
router.use('/moneyorder',require('./moneyorder'))
router.use('/user',require('./user'))
router.use('/postman',require('./postman'))
router.use('/clerk',require('./clerk'))
router.use('/courier',require('./courier'))
router.use('/address',require('./address'))

module.exports = router