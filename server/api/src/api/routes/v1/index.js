const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('Ok'));

/**
 * GET v1/users
 */
router.use('/users', userRoutes);

/**
 * GET v1/users
 */
router.use('/auth', authRoutes);

module.exports = router;
