const express = require('express');
const router = express.Router();
const PostmasterController = require('../../controller/admin/PostmasterController');


router.get('/',PostmasterController.getAll)
router.get('/:id',PostmasterController.getOne)
router.post('/add',PostmasterController.create)
router.delete('/delete/:id',PostmasterController.del)
router.post('/update/:id',PostmasterController.update)

module.exports = router;