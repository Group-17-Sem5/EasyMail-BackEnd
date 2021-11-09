const express = require('express');
const router = express.Router();
const userController = require('../../controller/postMaster/UserController');
const {ifLogin} = require('../../config/auth')

router.get('/',ifLogin,userController.getAll)
router.get('/:id',ifLogin,userController.getOne)
router.post('/add',ifLogin,userController.create)
router.delete('/delete/:id',ifLogin,userController.del)
router.post('/update/:id',ifLogin,userController.update)

module.exports = router;