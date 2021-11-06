const express = require('express');
const router = express.Router();
const courierController = require('../../controller/postMaster/CourierController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,courierController.getAll)
router.get('/count',ensureLogin,courierController.countByDate)
router.get('/allCount',ensureLogin,courierController.count)
router.post('/filter',ensureLogin,courierController.filter)
router.get('/count/:postmanID',ensureLogin,courierController.countByDatePostman)
router.post('/filter/:postmanID',ensureLogin,courierController.filterPostman)
router.get('/:id',ensureLogin,courierController.getOne)
router.post('/add',ensureLogin,courierController.create)
router.delete('/delete/:id',ensureLogin,courierController.del)
router.post('/update/:id',ensureLogin,courierController.update)
router.post('/updatePostman/:id',ensureLogin,courierController.updatePostman)


module.exports = router;