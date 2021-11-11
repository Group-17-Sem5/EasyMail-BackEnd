const express = require('express');
const router = express.Router();
const passwordController = require('../controller/PasswordController');
const {ensureLogin} = require('../config/auth')

router.post('/change',ensureLogin,passwordController.ChangePassword)

module.exports = router;