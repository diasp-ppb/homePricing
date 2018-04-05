const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');


const router = express.Router();
const app = express();
/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OKlllllllllllllll'));


/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);

router.use('/auth', authRoutes);


module.exports = router;
