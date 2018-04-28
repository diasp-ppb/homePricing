const httpStatus = require('http-status');
const { omit } = require('lodash');
const Favorite = require('../models/favorite.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Load favorite and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const favorite = await Favorite.get(id);
    req.locals = { favorite };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get favorites list
 * @public
 */

exports.list = async (req, res, next) => {
  try {
    const favorites = await Favorite.list(req.query);
    const transformedFavorites = favorites.map(favorite => favorite.transform());
    res.json(transformedFavorites);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new favorite
 * @public
 */

exports.create = async (req, res, next) => {
    try {
        const favorite = await (new Favorite(req.body)).save();
        const FavoriteTransformed = favorite.transform();
        res.status(httpStatus.CREATED);
        return res.json(favorite);
    } catch (error) {
        return res.json(error);
    }
  };
  
/**
 * Get favorites
 * @public
 */
exports.userFavorites = async (req, res, next) => {
    try {
      const favorites = await Favorite.get(req.body);
      const transformedFavorites = favorites.map(favorite => favorite.transform());
      res.json(favorites);
    } catch (error) {
      next(error);
    }
  };
  



