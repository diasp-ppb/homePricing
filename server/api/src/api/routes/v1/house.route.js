let express = require('express');
let router = express.Router();

// Require controller modules.
const house_controller = require('../../controllers/house.controller');

/// HOUSE ROUTES ///

// GET request for one house.
router.get('/house/:id', house_controller.house_detail);

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource 1');
// });

module.exports = router;
