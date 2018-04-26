const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const housesRoutes = require('./houses.route');
const userPreferencesRoutes = require('./user-preferences.route');
const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status.json', (req, res) => res.send({"status": "ok"}));

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
router.use('/houses', housesRoutes);

/**
 * GET v1/user/preferences
 */
router.use('/user/preferences', userPreferencesRoutes);

module.exports = router;
