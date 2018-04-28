const Joi = require('joi');

var year = new Date().getFullYear();

module.exports = {

    favoritesInsert: {
        body: {
            userId: Joi.string().min(1).required(),
            houseId: Joi.string().min(1).required()
        },
    },
    userFavorites: {
        body: {
            userId: Joi.string().min(1).required()
        },
    },
}
