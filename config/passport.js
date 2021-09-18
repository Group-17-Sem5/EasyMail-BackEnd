const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

// services
const Postmaster = require('../services/postMaster/postmasterService')
const Admin = require('../services/postMaster/adminService')

module.exports = function (passport) {


    passport.use(
        new JWTstrategy(
            {
                secretOrKey: process.env.JWT_SECRET,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            },
            async (token, done) => {
                try {
                    return done(null, token);
                } catch (error) {
                    done(error);
                }
            }
        )
    );


    passport.use(
        'login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            async (req, email, password, done) => {
                try {


                    if (!email || !password) {
                        return done(null, false, { error: true, email: false, password: false, message: 'Invalid credentials' });
                    }



                    const admin = await Admin.findByEmail(email)
                    if (admin) {
                        const validate = await admin.isValidPassword(password);
                        if (!validate) {
                            return done(null, false, { error: true, email: true, password: false, message: 'Wrong Password' });
                        }
                        const user = { _id: null, type: 'admin', name: 'Admin' };
                        return done(null, user, { message: 'Logged in Successfully as admin' });
                    }



                    const postmaster = await Postmaster.findByEmail( email);
                    if (!postmaster) {
                        return done(null, false, { error: true, email: false, password: true, message: 'User not found' });
                    }
                    if (!postmaster.status) {
                        return done(null, false, { error: true, email: false, password: true, message: 'Your user account has blocked' });
                    }
                    const validate = await postmaster.isValidPassword(password);
                    if (!validate) {
                        return done(null, false, { error: true, email: true, password: false, message: 'Wrong Password' });
                    }
                    const user = { _id: postmaster._id, type: 'postmaster', name: postmaster.username }
                    return done(null, user, { message: 'Logged in Successfully' });
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
}