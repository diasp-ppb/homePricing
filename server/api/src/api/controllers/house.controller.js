const httpStatus = require('http-status');
const { omit } = require('lodash');
const House = require('../models/house.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Load house and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const house = await House.get(id);
    req.locals = { house };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/** Get house list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const houses = await House.list(req.query);
    const transformedHouses = houses.map(house => house.transform());
    res.json(transformedHouses);
  } catch (error) {
    next(error);
  }
};

/**
 * Get house
 * @public
 */
exports.get = (req, res) => {
	console.log("------------------------- [ Got To house.controller ] --------------------")
  res.json(req.locals.house.transform())
};
