const express = require('express');
const router = express.Router();
const userController = require('../../controller/postMaster/UserController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,userController.getAll)
router.get('/:id',ensureLogin,userController.getOne)
router.post('/add',ensureLogin,userController.create)
router.delete('/delete/:id',ensureLogin,userController.del)
router.post('/update/:id',ensureLogin,userController.update)

module.exports = router;