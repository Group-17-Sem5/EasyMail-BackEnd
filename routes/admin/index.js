const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'))
router.use('/branch',require('./branch'))

module.exports = router