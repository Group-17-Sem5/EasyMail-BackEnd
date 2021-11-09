const express = require('express');
const router = express.Router();
const ClerkController = require('../../controller/clerk/ClerkController');
const {ifLogin} = require('../../config/auth')

router.get('/',ifLogin,ClerkController.getAllClerk)
router.get('/:id',ifLogin,ClerkController.getClerk)
router.post('/add',ifLogin,ClerkController.createClerk)
router.delete('/delete/:id',ifLogin,ClerkController.deleteClerk)
router.post('/update/:id',ifLogin,ClerkController.updateClerk)
router.post('/updateStatus/:id',ifLogin,ClerkController.changeStatus)

module.exports = router;