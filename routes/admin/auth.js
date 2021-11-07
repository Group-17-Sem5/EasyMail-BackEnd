const express = require('express');
const router = express.Router();
const authController = require('../../controller/admin/AuthController')


router.post('/login', authController.login);

module.exports = router;