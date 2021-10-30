const express = require('express');
const router = express.Router();
const BranchController = require('../../controller/admin/BranchController');
const {ensureLogin} = require('../../config/auth')

router.get('/',ensureLogin,BranchController.getAllBranch)
router.get('/:id',ensureLogin,BranchController.getBranch)
router.post('/add',ensureLogin,BranchController.createBranch)
router.delete('/delete/:id',ensureLogin,BranchController.deleteBranch)
router.post('/update/:id',ensureLogin,BranchController.updateBranch)

module.exports = router;