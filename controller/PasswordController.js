const Password = require('../services/PasswordService')
const bcrypt = require('bcrypt')


const ChangePassword =async (req,res) => {
    const id = req.user._id
    const { password } = req.body
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