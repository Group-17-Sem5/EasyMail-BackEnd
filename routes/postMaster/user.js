const express = require('express');
const router = express.Router();
const UserController = require('../../controller/postMaster/UserController');


router.get('/',UserController.getAll)
router.get('/:id',UserController.getOne)
router.post('/add',UserController.create)
router.delete('/delete/:id',UserController.del)
router.post('/update/:id',UserController.update)

module.exports = router;