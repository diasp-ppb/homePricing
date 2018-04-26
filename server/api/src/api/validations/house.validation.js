const Joi = require('joi');
const House = require('../models/house.model');

module.exports = {

    // GET /v1/houses
    listHouses: {
        query: {
            page: Joi.number().min(1),
            perPage: Joi.number().min(1).max(100),
        },
    },

};