const Admin = require('../../models/admin')

exports.findByEmail = (email) => {
    return Admin.findOne({ 'username': email })
}