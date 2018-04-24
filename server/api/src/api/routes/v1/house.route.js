const express = require('express');
//const validate = require('express-validation');
const controller = require('../../controllers/house.controller');

const router = express.Router();

/**
 * Load house when API with houseId route parameter is hit
 */
router.param('houseId', controller.load);

/**
   * @api {get} v1/houses List houses
   * @apiDescription Get a list of houses
   * @apiVersion 1.0.0
   * @apiName ListHouses
   * @apiGroup House
   * @apiPermission anyone
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Houses per page
   * @apiParam  {String}             [name]       Houses's name
   *
   * @apiSuccess {Object[]} houses List of houses.
   * 
   * 
   * * @api {post} v1/houses Create house
   * @apiDescription Create a house
   * @apiVersion 1.0.0
   * @apiName ListHouses
   * @apiGroup House
   * @apiPermission anyone
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Houses per page
   * @apiParam  {String}             [name]       Houses's name
   *
   * @apiSuccess {Object[]} houses List of houses.
   */
router.route('/')
  .get(controller.list)
  .post(controller.create);

router.route('/filter')
  .post(controller.filter)

router.route('/:houseId')
  .get(controller.get);

module.exports = router