const express = require('express');
const router = express.Router();
const postmasterController = require('../../controller/admin/PostmasterController');
const {ensureLogin} = require('../../config/auth')

router.get('/',postmasterController.getAll)
router.get('/:id',ensureLogin,postmasterController.getOne)
router.post('/add',postmasterController.create)
router.delete('/delete/:id',ensureLogin,postmasterController.del)
router.post('/update/:id',ensureLogin,postmasterController.update)


module.exports = router;