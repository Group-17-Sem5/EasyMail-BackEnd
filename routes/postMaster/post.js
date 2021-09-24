const express = require('express');
const router = express.Router();
const PostController = require('../../controller/postMaster/PostController');


router.get('/',PostController.getAll)
router.get('/:id',PostController.getOne)
router.post('/add',PostController.create)
router.delete('/delete/:id',PostController.del)
router.post('/update/:id',PostController.update)

module.exports = router;