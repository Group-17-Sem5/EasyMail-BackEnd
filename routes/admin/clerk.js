const express = require('express');
const router = express.Router();
const clerkController = require('../../controller/admin/clerkController');
const {ifLogin} = require('../../config/auth')

router.get('/',ifLogin,clerkController.getAll)
router.get('/:id',ifLogin,clerkController.getOne)
router.post('/add',ifLogin,clerkController.create)
router.delete('/delete/:id',ifLogin,clerkController.del)
router.post('/update/:id',ifLogin,clerkController.update)

module.exports = router;