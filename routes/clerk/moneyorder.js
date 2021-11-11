const express = require('express');
const router = express.Router();
const MoneyorderController = require('../../controller/clerk/MoneyOrderController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,MoneyorderController.getAll)
router.get('/:id',ensureLogin,MoneyorderController.getOne)
router.post('/add',ensureLogin,MoneyorderController.create)
router.delete('/delete/:id',ensureLogin,MoneyorderController.del)
router.post('/confirm/:id',ensureLogin,MoneyorderController.con)
router.post('/update/:id',ensureLogin,MoneyorderController.update)
router.post('/updatePostman/:id',ensureLogin,MoneyorderController.updatePostman)
router.get('/count',ensureLogin,MoneyorderController.countByDate)
router.get('/allCount',ensureLogin,MoneyorderController.count)


module.exports = router;