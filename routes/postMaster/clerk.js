const express = require('express');
const router = express.Router();
const clerkController = require('../../controller/postMaster/ClerkController');
const {ifLogin} = require('../../config/auth')

router.get('/',ifLogin,clerkController.getAllClerk)
router.get('/:id',ifLogin,clerkController.getClerk)
router.post('/add',ifLogin,clerkController.createClerk)
router.delete('/delete/:id',ifLogin,clerkController.deleteClerk)
router.post('/update/:id',ifLogin,clerkController.updateClerk)
router.get('/get/count',ifLogin,clerkController.getClerkCount)
router.post('/updateStatus/:id',ifLogin,clerkController.changeStatus)

module.exports = router;