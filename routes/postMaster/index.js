const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));

router.use('/postman',require('./postman'));
router.use('/clerk',require('./clerk'));
// router.use('/post',require('./post'));
router.use('/user',require('./user'));
router.use('/courier',require('./courier'));
router.use('/moneyorder',require('./moneyOrder'));
router.use('/address',require('./address'));


module.exports = router;