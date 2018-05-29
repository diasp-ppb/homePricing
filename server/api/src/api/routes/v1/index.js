const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const houseRoutes = require('./house.route');
const userPreferencesRoutes = require('./user-preferences.route');
const favoritesRoutes = require('./favorites.route');
const historyRoutes = require('./history.route');
const recommendationsRoutes = require('./recommendations.route');

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
 * GET v1/auth
 */
router.use('/auth', authRoutes);

/**
 * GET v1/houses
 */

router.use('/houses', houseRoutes);

/**
 * GET v1/user/preferences
 */
router.use('/user/preferences', userPreferencesRoutes);

/**
 * GET v1/favorites
 */
router.use('/favorites', favoritesRoutes);

/**
 * GET v1/history
 */
router.use('/history', historyRoutes);

/**
 * GET v1/recommendations
 */
router.use('/recommendations', recommendationsRoutes);

module.exports = router;
