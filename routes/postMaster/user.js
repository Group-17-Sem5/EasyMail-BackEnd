const express = require('express');
const router = express.Router();
const UserController = require('../../controller/postMaster/UserController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,UserController.getAll)
router.get('/:id',ensureLogin,UserController.getOne)
router.post('/add',ensureLogin,UserController.create)
router.delete('/delete/:id',ensureLogin,UserController.del)
router.post('/update/:id',ensureLogin,UserController.update)

module.exports = router;