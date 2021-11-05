const express = require('express');
const router = express.Router();

// All routes of Postman
const postManRoutes = require('./api/postMan');
const userRoutes=require('./api/user');
//router.use('/clerk',require('./clerk'));    //!error

//postMan routes
router.use('/postMan', postManRoutes);
//router.use('/postMaster',require('./postMaster'))
router.use('/changepassword',require('./changepassword'));
router.use('/admin',require('./admin'))

router.use('/user', userRoutes);

//user event routes
// router.use('/events', postManRoutes);

// //user event membership routes
// router.use('/memberships', postManRoutes);

module.exports = router;
