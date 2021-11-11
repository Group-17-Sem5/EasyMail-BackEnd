const express = require('express');
const router = express.Router();
const moneyorderController = require('../../controller/postMaster/MoneyorderController');
const {ifLogin} = require('../../config/auth')

router.get('/',ifLogin,moneyorderController.getAll)
router.get('/',ifLogin,moneyorderController.getAll)
router.post('/filter',ifLogin,moneyorderController.filter)
router.get('/count',ifLogin,moneyorderController.countByDate)
router.get('/count/:postmanID',ifLogin,moneyorderController.countByDatePostman)
router.get('/allCount',ifLogin,moneyorderController.count)
router.post('/filter/:postmanID',ifLogin,moneyorderController.filterPostman)
router.get('/:id',ifLogin,moneyorderController.getOne)
router.post('/add',ifLogin,moneyorderController.create)
router.delete('/delete/:id',ifLogin,moneyorderController.del)
router.post('/update/:id',ifLogin,moneyorderController.update)
router.post('/updatePostman/:id',ifLogin,moneyorderController.updatePostman)

module.exports = router;