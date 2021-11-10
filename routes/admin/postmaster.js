const express = require('express');
const router = express.Router();
const postmasterController = require('../../controller/admin/PostmasterController');
const {ifLogin} = require('../../config/auth')

router.get('/',ifLogin,postmasterController.getAll)
router.get('/:id',ifLogin,postmasterController.getOne)
router.post('/add',ifLogin,postmasterController.create)
router.delete('/delete/:id',ifLogin,postmasterController.del)
router.post('/update/:id',ifLogin,postmasterController.update)


module.exports = router;