const express = require('express');
const validate = require('express-validation');
const { authorize, ADMIN } = require('../../middlewares/auth');
const controller = require('../../controllers/house.controller');
const {
  insertHouse,
  updateHouse,
  getHouse,
  request
} = require('../../validations/house.validation');

const router = express.Router();

/**
 * Load house when API with houseId route parameter is hit
 */
router.param('houseId', controller.load);

router.route('/')
  /**
   * @api {get} v1/houses List houses
   * @apiDescription Get a list of houses
   * @apiVersion 1.0.0
   * @apiName ListHouses
   * @apiGroup House
   * @apiPermission anyone
   *
   * @apiSuccess {Object[]} houses List of houses.
   */
  .get(controller.list)
  /**
   * @api {post} v1/houses Create house
   * @apiDescription Create a house
   * @apiVersion 1.0.0
   * @apiName CreateHouse
   * @apiGroup House
   * @apiPermission Admin
   *
   * @apiSuccess {Object[]} houses List of houses.
   */
  .post(authorize(ADMIN), validate(insertHouse), controller.create);

router.route('/filter')
  /**
  * @api {post} v1/houses/filter List houses that match a filter / criteria
  * @apiDescription List houses that match a filter / criteria
  * @apiVersion 1.0.0
  * @apiName FindHouses
  * @apiGroup House
  * @apiPermission anyone
  *
  * @apiSuccess {Object[]} houses List of houses.
  *
  */
  .post(validate(request), controller.filter)

router.route('/findbygps')
  .post(controller.findbygps)

/**
 * @api {get} v1/houses/:houseId Get house
 * @apiDescription Get house
 * @apiVersion 1.0.0
 * @apiName GetHouse
 * @apiGroup House
 * @apiPermission anyone
 */
  
router.route('/:houseId')
  /**
   * @api {get} v1/houses/:houseId Get house
   * @apiDescription Get house
   * @apiVersion 1.0.0
   * @apiName GetHouse
   * @apiGroup House
   * @apiPermission anyone
   */
  .get(validate(getHouse), controller.get)
  /**
 * @api {get} v1/houses/:houseId Update house
 * @apiDescription Update house
 * @apiVersion 1.0.0
 * @apiName UpdateHouse
 * @apiGroup House
 * @apiPermission Admin
 */
  .patch(authorize(ADMIN), validate(updateHouse), controller.update)

module.exports = router