const httpStatus = require('http-status');
const { omit } = require('lodash');
const House = require('../models/house.model');
const { handler: errorHandler } = require('../middlewares/error');
const convertParams = require('../middlewares/convert').convertParams;
const searchHouses = require('../middlewares/search').searchHouses;

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

/**
 * Get house
 * @public
 */
exports.get = (req, res) => res.json(req.locals.house.transform());

/**
 * Create new house
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const house = await (new House(req.body)).save();
    const houseTransformed = house.transform();
    res.status(httpStatus.CREATED);
    return res.json(house);
  } catch (error) {
    return res.json(error);
  }
};

/**
 * Update existing house
 * @public
 */
exports.update = (req, res, next) => {
  const updatedHouse = req.body;
  const house = Object.assign(req.locals.house, updatedHouse);

  house.save()
    .then(savedHouse => res.json(savedHouse.transform()))
    .catch(e => console.log(e));
};

/**
 * Get house list
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
 * Filter houses
 * @public
 */
exports.filter = async (req, res, next) => {
  try {
    var filters = convertParams(req.body);
    const propertyCentricHouses = await House.filter(filters);
    const houses = await searchHouses(propertyCentricHouses, req.body);
    const transformedHouses = houses.map(house => house.transform());
    res.json(houses);
  } catch (error) {
    next(error);
  }
};


/**
 * Find houses by gps
 * @public
 */
exports.findbygps = async (req, res, next ) => {
  try {
    const params = req.body;

    let Lat = params.latitude;
    let Long = params.longitude;
    let deltaLathalf = params.latitudeDelta / 2;
    let deltaLonhalf = params.longitudeDelta / 2;

    let minLat = Lat - deltaLathalf;
    let maxLat = Lat + deltaLathalf;

    let minLong = Long - deltaLonhalf;
    let maxLong = Long + deltaLonhalf;


    const houses = await House.findByLocation(minLat, maxLat, minLong, maxLong);
    res.json(houses);

  } catch (error) {
    next(error);
  }
}
/**
 * Delete house
 * @public
 */
exports.remove = (req, res, next) => {
  const { house } = req.locals;

  house.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};