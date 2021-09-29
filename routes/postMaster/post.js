const express = require('express');
const router = express.Router();
const PostController = require('../../controller/postMaster/PostController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,PostController.getAll)
router.get('/:id',ensureLogin,PostController.getOne)
router.post('/add',ensureLogin,PostController.create)
router.delete('/delete/:id',ensureLogin,PostController.del)
router.post('/update/:id',ensureLogin,PostController.update)

module.exports = router;