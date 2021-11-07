const express = require('express');
const router = express.Router();
const clerkController = require('../../controller/admin/clerkController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,clerkController.getAll)
router.get('/:id',ensureLogin,clerkController.getOne)
router.post('/add',ensureLogin,clerkController.create)
router.delete('/delete/:id',ensureLogin,clerkController.del)
router.post('/update/:id',ensureLogin,clerkController.update)

module.exports = router;