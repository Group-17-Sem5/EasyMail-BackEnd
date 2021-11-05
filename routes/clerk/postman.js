const express = require('express');
const router = express.Router();
const PostmanController = require('../../controller/clerk/PostmanController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,PostmanController.getAllPostman)
router.get('/:id',ensureLogin,PostmanController.getPostman)
router.post('/add',ensureLogin,PostmanController.createPostman)
router.delete('/delete/:id',ensureLogin,PostmanController.deletePostman)
router.post('/update/:id',ensureLogin,PostmanController.updatePostman)
router.get('/get/count',ensureLogin,PostmanController.getPostmanCount)
router.post('/updateStatus/:id',ensureLogin,PostmanController.changeStatus)

module.exports = router;