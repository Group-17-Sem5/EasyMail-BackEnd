const express = require('express');
const router = express.Router();
const passwordController = require('../controller/PasswordController');
const {ifLogin} = require('../config/auth')

router.post('/change',ifLogin,passwordController.ChangePassword)

module.exports = router;