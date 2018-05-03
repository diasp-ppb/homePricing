const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const houseRoutes = require('./house.route');
const historyRoutes = require('./history.route');
const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send("OK"));

/**
 * GET v1/users
 */
router.use('/users', userRoutes);

/**
 * GET v1/users
 */
router.use('/auth', authRoutes);

/**
 * GET v1/houses
 */
router.use('/houses', houseRoutes);

/**
 * GET v1/history
 */
router.use('/history', historyRoutes);

module.exports = router;
