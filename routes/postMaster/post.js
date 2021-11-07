const express = require('express');
const router = express.Router();
const postController = require('../../controller/postMaster/PostController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,postController.getAll)
router.get('/count',ensureLogin,postController.countByDate)
router.get('/allCount',ensureLogin,postController.count)
router.post('/filter',ensureLogin,postController.filter)
router.get('/count/:postmanID',ensureLogin,postController.countByDatePostman)
router.post('/filter/:postmanID',ensureLogin,postController.filterPostman)
router.get('/:id',ensureLogin,postController.getOne)
router.post('/add',ensureLogin,postController.create)
router.delete('/delete/:id',ensureLogin,postController.del)
router.post('/update/:id',ensureLogin,postController.update)
router.post('/updatePostman/:id',ensureLogin,postController.updatePostman)

module.exports = router;