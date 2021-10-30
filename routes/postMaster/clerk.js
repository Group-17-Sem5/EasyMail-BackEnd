const express = require('express');
const router = express.Router();
const ClerkController = require('../../controller/postMaster/ClerkController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,ClerkController.getAllClerk)
router.get('/:id',ensureLogin,ClerkController.getClerk)
router.post('/add',ensureLogin,ClerkController.createClerk)
router.delete('/delete/:id',ensureLogin,ClerkController.deleteClerk)
router.post('/update/:id',ensureLogin,ClerkController.updateClerk)
router.get('/get/count',ensureLogin,ClerkController.getClerkCount)
router.post('/updateStatus/:id',ensureLogin,ClerkController.changeStatus)

module.exports = router;