const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
  favoritesInsert,
  userFavorites
} = require('../../validations/favorites.validation');

const controller = require('../../controllers/favorites.controller');

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load);

/**
 * @api {get} v1/favorites
 * @apiDescription Get a list of all favorites
 * @apiVersion 1.0.0
 * @apiName ListFavorites
 * @apiGroup Favorite
 * @apiPermission anyone 
 *
 * @apiSuccess {Object[]} favorite List of favorites.
 * 
 * 
*/
router
  .route('/')
  .get(controller.list)
/**
 * @api {get} v1/favorites/:user 
 * @apiDescription Get user's favorites
 * @apiVersion 1.0.0
 * @apiName GetFavorites
 * @apiGroup Favorite
 * @apiPermission Logged User
 *
 * @apiSuccess {Object[]} 
 */
  .post(validate(userFavorites),controller.userFavorites);

/**
 * @api {post} v1/favorites/create 
 * @apiDescription Create a new favorite
 * @apiVersion 1.0.0
 * @apiName CreateFavorites
 * @apiGroup Favorite
 * @apiPermission Logged User
 *
 * @apiSuccess {Object[]} 
 */
router.route('/create')
  .post(validate(favoritesInsert),controller.create);

/**
 * @api {post} v1/favorites/remove 
 * @apiDescription Remove a favorite
 * @apiVersion 1.0.0
 * @apiName RemoveFavorite
 * @apiGroup Favorite
 * @apiPermission Logged User
 *
 * @apiSuccess {Object[]} 
 */
router.route('/remove')
  .delete(controller.removeFavorite);

module.exports = router;