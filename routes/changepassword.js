const express = require('express');
const router = express.Router();
const PasswordController = require('../controller/PasswordController');
const {ensureLogin} = require('../config/auth')

router.post('/change',ensureLogin,PasswordController.ChangePassword)

module.exports = router;