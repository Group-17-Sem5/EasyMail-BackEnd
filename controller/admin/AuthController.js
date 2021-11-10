const passport = require('passport')
const jwt = require('jsonwebtoken')

const login = async (req, res, next) => {
    passport.authenticate(
        'login',
        async (err, user, info) => {
            try {
                if (err) {
                    return next(err);
                } else if (!user) {
                    return res.json({ status: false, error: info })
                    // return next(error);
                }
                req.login(
                    user,
                    { session: false },
                    async (error) => {
                        if (error) return next(error);
                        const token = jwt.sign({ user: { _id: user._id, type: user.type }}, 'easyMailPW');
                        return res.json({ status: true, token, user: user });
                    }
                );
            } catch (error) {
                return next(error);
            }
        }
    )(req, res, next);
}

module.exports = {
    login,
};