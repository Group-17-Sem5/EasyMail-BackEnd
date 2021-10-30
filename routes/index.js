const express = require('express');
const router = express.Router();
// All routes of Postman
const postManRoutes = require('./api/postMan');
const userRoutes=require('./api/user');


//postMan routes
router.use('/postMan', postManRoutes);

router.use('/user', userRoutes);
//user event routes
// router.use('/events', postManRoutes);

// //user event membership routes
// router.use('/memberships', postManRoutes);

module.exports = router;
