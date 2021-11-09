const express = require('express');
const router = express.Router();
const postController = require('../../controller/postMaster/postController');
const {ifLogin} = require('../../config/auth');


router.get('/',ifLogin,postController.getAll)
router.get('/count',postController.countByDate)
router.get('/allCount',ifLogin,postController.count)
router.post('/filter',ifLogin,postController.filter)
router.get('/count/:postmanID',ifLogin,postController.countByDatePostman)
router.post('/filter/:postmanID',ifLogin,postController.filterPostman)
router.get('/:id',ifLogin,postController.getOne)
router.post('/add',ifLogin,postController.create)
router.delete('/delete/:id',ifLogin,postController.del)
router.post('/update/:id',ifLogin,postController.update)
router.post('/updatePostman/:id',ifLogin,postController.updatePostman)


module.exports = router;