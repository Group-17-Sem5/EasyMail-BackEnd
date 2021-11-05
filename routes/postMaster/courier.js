const express = require('express');
const router = express.Router();
const courierController = require('../../controller/postMaster/CourierController');
const {ensureLogin} = require('../../config/auth')

router.get('/',courierController.getAll)
router.get('/count',courierController.countByDate)
router.get('/allCount',courierController.count)
router.get('/filter',courierController.filter)
router.get('/:id',ensureLogin,courierController.getOne)
router.post('/add',ensureLogin,courierController.create)
router.delete('/delete/:id',ensureLogin,courierController.del)
router.post('/update/:id',ensureLogin,courierController.update)
router.post('/updatePostman/:id',ensureLogin,courierController.updatePostman)


module.exports = router;