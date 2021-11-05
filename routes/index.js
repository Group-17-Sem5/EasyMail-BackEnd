const express = require('express');
const router = express.Router();


//router.use('/clerk', clerkRoutes);
router.use('/clerk',require('./clerk'))
router.use('/admin',require('./admin'))
//user event routes
// router.use('/events', postManRoutes);

// //user event membership routes
// router.use('/memberships', postManRoutes);

module.exports = router;
