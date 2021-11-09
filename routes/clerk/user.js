const express = require('express');
const router = express.Router();
const UserController = require('../../controller/clerk/UserController');
const {ifLogin} = require('../../config/auth')


router.get('/',ifLogin,UserController.getAll)
router.get('/:id',ifLogin,UserController.getOne)
router.post('/add',ifLogin,UserController.create)
router.delete('/delete/:id',ifLogin,UserController.del)
router.post('/update/:id',ifLogin,UserController.update)

module.exports = router;