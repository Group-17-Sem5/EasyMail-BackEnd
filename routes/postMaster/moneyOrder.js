const express = require('express');
const router = express.Router();
const moneyorderController = require('../../controller/postMaster/MoneyorderController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,moneyorderController.getAll)
router.get('/',moneyorderController.getAll)
router.get('/count',moneyorderController.countByDate)
router.get('/allCount',moneyorderController.count)
router.get('/:id',ensureLogin,moneyorderController.getOne)
router.post('/add',ensureLogin,moneyorderController.create)
router.delete('/delete/:id',ensureLogin,moneyorderController.del)
router.post('/update/:id',ensureLogin,moneyorderController.update)
router.post('/updatePostman/:id',ensureLogin,moneyorderController.updatePostman)

module.exports = router;