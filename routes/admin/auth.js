const express = require('express');
const router = express.Router();
const AuthController = require('../../controller/admin/AuthController')


router.post('/login', AuthController.login);

module.exports = router;