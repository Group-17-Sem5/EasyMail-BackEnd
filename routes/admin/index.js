const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'))
router.use('/branch',require('./branch'))
router.use('/postmaster',require('./postmaster'))

module.exports = router