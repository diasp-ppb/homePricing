const httpStatus = require('http-status');
const { omit } = require('lodash');
const Recommendations = require('../models/recommendations.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Load recommendations and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
    try {
        const recommendations = await Recommendations.get(id);
        req.locals = { recommendations };
        return next();
    } catch (error) {
        return errorHandler(error, req, res);
    }
};

/**
 * Get recommendations list
 * @public
 */

exports.list = async (req, res, next) => {
    try {
        const recommendations = await Recommendations.list(req.query);
        const transformedHouses = recommendations.map(house => house.transform());
        res.json(transformedHouses);
        
    } catch (error) {
        next(error);
    }
};