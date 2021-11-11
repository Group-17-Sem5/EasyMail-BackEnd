const express = require('express');
const router = express.Router();
const PostController = require('../../controller/clerk/MailController');
const {ifLogin} = require('../../config/auth')

router.get('/',ifLogin,PostController.getAll)
router.get('/:id',ifLogin,PostController.getOne)
router.post('/add',ifLogin,PostController.create)
router.delete('/delete/:id',ifLogin,PostController.del)
router.post('/update/:id',ifLogin,PostController.update)
router.get('/count',ifLogin,PostController.countByDate)
router.get('/allCount',ifLogin,PostController.count)
router.get('/filter',ifLogin,PostController.filter)
module.exports = router;