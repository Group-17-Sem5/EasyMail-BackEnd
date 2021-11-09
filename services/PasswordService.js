const PostMaster = require('../models/clerk')


exports.ChangePassword = (id,hashPassword) => {
    return PostMaster.updateOne ({_id:id},
    {
        $set: {password:hashPassword}
    })
}