const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');

const controller = require('../../controllers/recommendations.controller');

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load);

router
    .route('/')
    .get(controller.list)
    /**
     * @api {get} v1/recommendations
     * @apiDescription Get a list of recommendations
     * @apiVersion 1.0.0
     * @apiName ListRecommendations
     * @apiGroup Recommendations
     * @apiPermission anyone 
     *
     * @apiSuccess {Object[]} recommendations List of Recommendations.
    */
    .post(authorize(LOGGED_USER), controller.list);

module.exports = router;