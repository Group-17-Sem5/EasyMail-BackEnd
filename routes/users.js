const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.get('/',userController.listAll)
router.post('/addUser',userController.create)
router.put('/editUser/:id',userController.editUsers)
router.delete('/deleteUser/:id',userController.deleteUsers)

module.exports = router;