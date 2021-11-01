const express = require('express');
const router = express.Router();
const MoneyorderController = require('../../controller/postMaster/MoneyorderController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,MoneyorderController.getAll)
router.get('/:id',ensureLogin,MoneyorderController.getOne)
router.post('/add',ensureLogin,MoneyorderController.create)
router.delete('/delete/:id',ensureLogin,MoneyorderController.del)
router.post('/update/:id',ensureLogin,MoneyorderController.update)
router.post('/updatePostman/:id',ensureLogin,MoneyorderController.updatePostman)

module.exports = router;