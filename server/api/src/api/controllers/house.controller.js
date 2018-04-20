let House = require('../models/house.model');

/**
 * Load house and append to req.
 * @public
 */
exports.house_detail = async (req, res) => {
    try {
        const house = await House.get(req.params.houseId);
        res.json(house);
    } catch (error) {
        return errorHandler(error, req, res);
    }
};
