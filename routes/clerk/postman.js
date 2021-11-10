const express = require('express');
const router = express.Router();
const PostmanController = require('../../controller/clerk/PostmanController');
const {ifLogin} = require('../../config/auth')

router.get('/',ifLogin,PostmanController.getAllPostman)
router.get('/:id',ifLogin,PostmanController.getPostman)
router.post('/add',ifLogin,PostmanController.createPostman)
router.delete('/delete/:id',ifLogin,PostmanController.deletePostman)
router.post('/update/:id',ifLogin,PostmanController.updatePostman)
router.get('/get/count',ifLogin,PostmanController.getPostmanCount)
router.post('/updateStatus/:id',ifLogin,PostmanController.changeStatus)

module.exports = router;