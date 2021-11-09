const express = require('express');
const router = express.Router();
const postmanController = require('../../controller/postMaster/PostmanController');
const {ifLogin} = require('../../config/auth')

router.get('/',ifLogin,postmanController.getAllPostman)
router.get('/:id',ifLogin,postmanController.getPostman)
router.post('/add',ifLogin,postmanController.createPostman)
router.delete('/delete/:id',ifLogin,postmanController.deletePostman)
router.post('/update/:id',ifLogin,postmanController.updatePostman)
router.get('/get/count',postmanController.getPostmanCount)
router.post('/updateStatus/:id',ifLogin,postmanController.changeStatus)

module.exports = router;