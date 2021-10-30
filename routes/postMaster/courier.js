const express = require('express');
const router = express.Router();
const CourierController = require('../../controller/postMaster/CourierController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,CourierController.getAll)
router.get('/:id',ensureLogin,CourierController.getOne)
router.post('/add',ensureLogin,CourierController.create)
router.delete('/delete/:id',ensureLogin,CourierController.del)
router.post('/update/:id',ensureLogin,CourierController.update)
router.post('/updatePostman/:id',ensureLogin,CourierController.updatePostman)

module.exports = router;