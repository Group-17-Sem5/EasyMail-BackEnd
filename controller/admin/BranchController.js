const Branch = require('../../services/admin/BranchService')


const getAllBranch = (req,res) => {
    Branch.findAll()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.send(err)
    })
}

const createBranch =async (req,res) => {
    const { branchName,mobileNumber,address } = req.body
    Branch.createBranch(branchName,mobileNumber,address)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const deleteBranch = (req,res) => {
    const {id} = req.params
    Branch.deleteBranch(id)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const updateBranch = (req,res) => {
    const {id} = req.params
    const {branchName,mobileNumber,address} = req.body
    Branch.updatePostman(id,branchName,mobileNumber,address)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const getBranch = (req,res) => {
    const {id} = req.params
    Branch.getBranch(id)
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports= {
    getAllBranch,
    createBranch,
    deleteBranch,
    updateBranch,
    getBranch
}