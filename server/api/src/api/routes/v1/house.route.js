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



module.exports = router;