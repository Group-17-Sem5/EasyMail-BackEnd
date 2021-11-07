const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const Postmaster = require('../services/admin/PostmasterService');
const Admin = require('../services/admin/AdminService');
const Clerk = require('../services/admin/clerkService');


module.exports = function (passport) {
    

    passport.use(
        new JWTstrategy(
            {
                secretOrKey: "easyMailPW",

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
                        return done(null, false, { error: true, email: false, password: false, message: 'Invalid details' });
                    }


                    const admin = await Admin.findByEmail(email)
                    if (admin) {
                        const validate = await admin.isValidPassword(password);
                        if (!validate) {
                            return done(null, false, { error: true, email: true, password: false, message: 'Invalid Username or Password' });
                        }
                        const user = { _id: admin._id, type: 'admin', name: 'Admin' };
                        return done(null, user, { message: 'Logged in Successfully as admin' });
                    }

                    // const clerk = await Clerk.findByEmail(email);
                    // // console.log(postmaster)
                    // if (clerk) {
                    //     if (!clerk.status) {
                    //         return done(null, false, { error: true, email: false, password: true, message: 'Your user account has blocked' });
                    //     }
                    //     const validate = await clerk.isValidPassword(password);
                    //     if (!validate) {
                    //         return done(null, false, { error: true, email: true, password: false, message: 'Wrong Password or Email.' });
                    //     }
                    //     const user = { _id: clerk._id, type: 'clerk', name: clerk.username,email: clerk.email,branchId:clerk.branchId }
                    //     return done(null, user, { message: 'Logged in Successfully' });
                    // }
                    const postmaster = await Postmaster.findByEmail( email);
                    // console.log(postmaster)
                    if (!postmaster) {
                        return done(null, false, { error: true, email: false, password: true, message: 'Invalid Username or Password' });
                    }
                    if (!postmaster.status) {
                        return done(null, false, { error: true, email: false, password: true, message: 'Invalid Username or Password' });
                    }
                    const validate = await postmaster.isValidPassword(password);
                    if (!validate) {
                        return done(null, false, { error: true, email: true, password: false, message: 'Invalid Username or Password' });
                    }
                    const user = { _id: postmaster._id, type: 'postmaster', name: postmaster.username,email: postmaster.email,branchId:postmaster.branchID }
                    return done(null, user, { message: 'Logged in Successfully' });



                    // const clerk = await Clerk.findByEmail(email);
                    // // console.log(postmaster)
                    // if (!clerk) {
                    //     return done(null, false, { error: true, email: false, password: true, message: 'User not found. Please enter a valid email.' });
                    // }
                    // if (!clerk.status) {
                    //     return done(null, false, { error: true, email: false, password: true, message: 'Your user account has blocked' });
                    // }
                    // const validate = await clerk.isValidPassword(password);
                    // if (!validate) {
                    //     return done(null, false, { error: true, email: true, password: false, message: 'Wrong Password or Email.' });
                    // }
                    // const user = { _id: clerk._id, type: 'clerk', name: clerk.username,email: clerk.email,branchId:clerk.branchId }
                    // return done(null, user, { message: 'Logged in Successfully' });
            



                } catch (error) {
                    return done(error);
                }
            }
        )
    );
}