const express = require('express');
const router = express.Router();
const MoneyorderController = require('../../controller/clerk/MoneyOrderController');
const {ifLogin} = require('../../config/auth')

router.get('/',ifLogin,MoneyorderController.getAll)
router.get('/:id',ifLogin,MoneyorderController.getOne)
router.post('/add',ifLogin,MoneyorderController.create)
router.delete('/delete/:id',ifLogin,MoneyorderController.del)
router.post('/confirm/:id',ifLogin,MoneyorderController.con)
router.post('/update/:id',ifLogin,MoneyorderController.update)
router.post('/updatePostman/:id',ifLogin,MoneyorderController.updatePostman)

module.exports = router;