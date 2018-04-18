const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const searchRoutes = require('./search.route');
const router = express.Router();
const app = express();

/**
 * GET v1/status
 */
router.get('/status.json', (req, res) => res.send(   {"status": "ok"} ));

/**
 * GET v1/users
 */
router.use('/users', userRoutes);

/**
 * GET v1/users
 */
router.use('/auth', authRoutes);

/**
 * GET v1/search
 */
router.use('/search', searchRoutes);

router

module.exports = router;
