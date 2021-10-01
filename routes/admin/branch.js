const express = require('express');
const router = express.Router();
const BranchController = require('../../controller/admin/BranchController');
const {ensureLogin} = require('../../config/auth')

router.get('/',BranchController.getAllBranch)
router.get('/:id',BranchController.getBranch)
router.post('/add',BranchController.createBranch)
router.delete('/delete/:id',BranchController.deleteBranch)
router.post('/update/:id',BranchController.updateBranch)

module.exports = router;