const passport = require('passport')
const _ = require('lodash');

module.exports = {
    ifLogin: function (req, res, next) {
        passport.authenticate('jwt', { session: false }, (err, token, info) => {
            if (err || !token || _.isEmpty(token)) {
                return res.status(401).send('Unauthorized');
            } 
             else {
                req.user = token;
                
                return next();
            }
        })(req, res, next);
    },
}