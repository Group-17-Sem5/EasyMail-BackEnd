const Password = require('../services/PasswordService')
const bcrypt = require('bcryptjs')
const validatePassword = require('../config/passwordValidate')


const ChangePassword =async (req,res) => {
    const id = req.user._id
    const { password,conPassword } = req.body
    const value = validatePassword(password,conPassword)
    
        const hashPassword = await bcrypt.hash(password,10)
        Password.ChangePassword(id,hashPassword)
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    
    
}

module.exports= {
    ChangePassword
}