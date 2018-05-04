const httpStatus = require('http-status');
const { omit } = require('lodash');
const History = require('../models/history.model');
const House = require('../models/house.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Load history and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const history = await History.find({ userId: id });
    req.locals = { history };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get history
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    const history = req.locals.history;
    const transformedHistory = history.map(history => history.transform());
    const houses = [];

    for (var result in history) {
      try {
        const house = await House.get(history[result].houseId);
        const tranformedHouse = house.transform();
        houses.push(tranformedHouse);
      } catch (error) {
        next(error);
      }
    }
    res.json(houses);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new history
 * @public
 */
// TODO: Verify if userId and houseId are valid and exist
exports.create = async (req, res, next) => {
  try {
    const history = await (new History(req.body)).save();
    const historyTransformed = history.transform();
    res.status(httpStatus.CREATED);
    return res.json(history);
  } catch (error) {
    return res.json(error);
  }
};

/**
 * Get history list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const history = await History.list(req.query);
    const transformedHistory = history.map(history => history.transform());
    res.json(transformedHistory);
  } catch (error) {
    next(error);
  }
};