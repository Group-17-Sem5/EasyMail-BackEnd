const express = require('express');
const router = express.Router();
// All routes of Postman
const postManRoutes = require('./api/postMan');



//postMan routes
router.use('/postMan', postManRoutes);
//router.use('/user', userRoutes);
//user event routes
// router.use('/events', postManRoutes);

// //user event membership routes
// router.use('/memberships', postManRoutes);

module.exports = router;
