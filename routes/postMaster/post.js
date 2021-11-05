const express = require('express');
const router = express.Router();
const postController = require('../../controller/postMaster/PostController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,postController.getAll)
router.get('/count',postController.countByDate)
router.get('/allCount',postController.count)
router.get('/:id',ensureLogin,postController.getOne)
router.post('/add',ensureLogin,postController.create)
router.delete('/delete/:id',ensureLogin,postController.del)
router.post('/update/:id',ensureLogin,postController.update)
router.post('/updatePostman/:id',ensureLogin,postController.updatePostman)

module.exports = router;