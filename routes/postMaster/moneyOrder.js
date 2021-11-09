const express = require('express');
const router = express.Router();
const moneyorderController = require('../../controller/postMaster/MoneyorderController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,moneyorderController.getAll)
router.get('/',ensureLogin,moneyorderController.getAll)
router.post('/filter',ensureLogin,moneyorderController.filter)
router.get('/count',ensureLogin,moneyorderController.countByDate)
router.get('/count/:postmanID',ensureLogin,moneyorderController.countByDatePostman)
router.get('/allCount',ensureLogin,moneyorderController.count)
router.post('/filter/:postmanID',ensureLogin,moneyorderController.filterPostman)
router.get('/:id',ensureLogin,moneyorderController.getOne)
router.post('/add',ensureLogin,moneyorderController.create)
router.delete('/delete/:id',ensureLogin,moneyorderController.del)
router.post('/update/:id',ensureLogin,moneyorderController.update)
router.post('/updatePostman/:id',ensureLogin,moneyorderController.updatePostman)

module.exports = router;