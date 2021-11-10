const express = require('express');
const router = express.Router();
const PostController = require('../../controller/clerk/MailController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,PostController.getAll)
router.get('/:id',ensureLogin,PostController.getOne)
router.post('/add',ensureLogin,PostController.create)
router.delete('/delete/:id',ensureLogin,PostController.del)
router.post('/confirm/:id',ensureLogin,PostController.con)
router.post('/update/:id',ensureLogin,PostController.update)
router.get('/count',PostController.countByDate)
router.get('/allCount',PostController.count)
router.get('/filter',PostController.filter)
//router.get('/count/:postmanID',ensureLogin,PostController.countByDatePostman)
//router.post('/filter/:postmanID',ensureLogin,PostController.filterPostman)
module.exports = router;