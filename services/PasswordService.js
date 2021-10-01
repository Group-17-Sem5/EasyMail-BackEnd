const PostMaster = require('../models/postMaster/postMaster')


exports.ChangePassword = (id,hashPassword) => {
    return PostMaster.updateOne ({_id:id},
    {
        $set: {password:hashPassword}
    })
}