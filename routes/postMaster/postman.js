const express = require('express');
const router = express.Router();
const postmanController = require('../../controller/postMaster/PostmanController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,postmanController.getAllPostman)
router.get('/:id',ensureLogin,postmanController.getPostman)
router.post('/add',ensureLogin,postmanController.createPostman)
router.delete('/delete/:id',ensureLogin,postmanController.deletePostman)
router.post('/update/:id',ensureLogin,postmanController.updatePostman)
router.get('/get/count',postmanController.getPostmanCount)
router.post('/updateStatus/:id',ensureLogin,postmanController.changeStatus)

module.exports = router;