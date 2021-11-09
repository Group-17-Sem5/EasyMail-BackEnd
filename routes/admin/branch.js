const express = require('express');
const router = express.Router();
const branchController = require('../../controller/admin/BranchController');
const {ifLogin} = require('../../config/auth')

router.get('/',ifLogin,branchController.getAllBranch)
router.get('/:id',ifLogin,branchController.getBranch)
router.post('/add',ifLogin,branchController.createBranch)
router.delete('/delete/:id',ifLogin,branchController.deleteBranch)
router.post('/update/:id',ifLogin,branchController.updateBranch)


module.exports = router;