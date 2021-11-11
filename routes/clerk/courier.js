const express = require('express');
const router = express.Router();
const CourierController = require('../../controller/clerk/CourierController');
const {ensureLogin} = require('../../config/auth')

router.get('/',CourierController.getAll)
router.get('/:id',ensureLogin,CourierController.getOne)
router.post('/add',ensureLogin,CourierController.create)
router.delete('/delete/:id',ensureLogin,CourierController.del)
router.post('/confirm/:id',ensureLogin,CourierController.con)
router.post('/update/:id',ensureLogin,CourierController.update)
router.post('/updatePostman/:id',ensureLogin,CourierController.updatePostman)
router.get('/count',ensureLogin,CourierController.countByDate)
router.get('/allCount',ensureLogin,CourierController.count)
router.post('/filter',ensureLogin,CourierController.filter)


module.exports = router;