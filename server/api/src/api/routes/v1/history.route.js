const express = require('express');
const validate = require('express-validation');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const controller = require('../../controllers/history.controller');
const { createHistory, getHistory } = require('../../validations/history.validation');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load);

router.route('/')
    .get(controller.list)
    .post(/*validate(createHistory), */controller.create)
/**
 * @api {get} v1/history/:userId Get history of user
 * @apiDescription Get history of user
 * @apiVersion 1.0.0
 * @apiName GetHistory
 * @apiGroup History
 * @apiPermission LOGGED_USER
 */
router.route('/:userId')
    .get(/*authorize(LOGGED_USER), */validate(getHistory), controller.get)

module.exports = router 