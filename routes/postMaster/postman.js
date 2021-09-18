const express = require('express');
const router = express.Router();
const PostmanController = require('../../controller/postMaster/PostmanController');


router.get('/',PostmanController.getAllPostman)
router.get('/:id',PostmanController.getPostman)
router.post('/add',PostmanController.createPostman)
router.delete('/delete/:id',PostmanController.deletePostman)
router.post('/update/:id',PostmanController.updatePostman)

module.exports = router;