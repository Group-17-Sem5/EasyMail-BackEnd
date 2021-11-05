const express = require('express');
const router = express.Router();
const PostmasterController = require('../../controller/admin/PostmasterController');

const {ensureLogin} = require('../../config/auth')

router.get('/',PostmasterController.getAll)
router.get('/:id',ensureLogin,PostmasterController.getOne)
router.post('/add',PostmasterController.create)
router.delete('/delete/:id',ensureLogin,PostmasterController.del)
router.post('/update/:id',ensureLogin,PostmasterController.update)


module.exports = router;