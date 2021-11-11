const express = require('express');
const router = express.Router();
const clerkController = require('../../controller/postMaster/ClerkController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,clerkController.getAllClerk)
router.get('/:id',ensureLogin,clerkController.getClerk)
router.post('/add',ensureLogin,clerkController.createClerk)
router.delete('/delete/:id',ensureLogin,clerkController.deleteClerk)
router.post('/update/:id',ensureLogin,clerkController.updateClerk)
router.get('/get/count',ensureLogin,clerkController.getClerkCount)
router.post('/updateStatus/:id',ensureLogin,clerkController.changeStatus)

module.exports = router;