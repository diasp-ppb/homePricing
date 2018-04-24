const express = require('express');
const router = express.Router();
const { authorize, LOGGED_USER } = require('../../middlewares/auth');


// Require controller modules.
const house_controller = require('../../controllers/house.controller');

/// HOUSE ROUTES ///
router.param('houseId', house_controller.load);


router
  .route('/:houseId')
  
  .get(house_controller.get);

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource 1');
// });

module.exports = router;
