const express = require('express');
const router = express.Router();
const branchController = require('../../controller/admin/BranchController');
const {ensureLogin} = require('../../config/auth')

router.get('/',branchController.getAllBranch)
router.get('/:id',ensureLogin,branchController.getBranch)
router.post('/add',branchController.createBranch)
router.delete('/delete/:id',ensureLogin,branchController.deleteBranch)
router.post('/update/:id',ensureLogin,branchController.updateBranch)


module.exports = router;