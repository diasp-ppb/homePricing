const express = require('express');
const router = express.Router();
const { authorize, LOGGED_USER } = require('../../middlewares/auth');


// Require controller modules.
const house_controller = require('../../controllers/house.controller');


router
  .route('/')

  .get(house_controller.list);



module.exports = router;
