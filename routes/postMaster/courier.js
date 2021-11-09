const express = require('express');
const router = express.Router();
const courierController = require('../../controller/postMaster/CourierController');
const {ifLogin} = require('../../config/auth')

router.get('/',ifLogin,courierController.getAllCourier)
router.get('/count',ifLogin,courierController.countByDateCourier)
router.get('/allCount',ifLogin,courierController.countCourier)
router.post('/filter',ifLogin,courierController.filterCourier)
router.get('/count/:postmanID',ifLogin,courierController.countByDatePostmanCourier)
router.post('/filter/:postmanID',ifLogin,courierController.filterPostmanCourier)
router.get('/:id',ifLogin,courierController.getOneCourier)
router.post('/add',ifLogin,courierController.createCourier)
router.delete('/delete/:id',ifLogin,courierController.delCourier)
router.post('/update/:id',ifLogin,courierController.updateCourier)
router.post('/updatePostman/:id',ifLogin,courierController.updatePostmanCourier)


module.exports = router;