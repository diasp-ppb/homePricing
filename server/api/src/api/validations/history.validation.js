const Joi = require('joi');

module.exports = {

    // POST /v1/history
    createHistory: {
        body: {
            userId: Joi.string().min(1).max(25).required(),
            houseId: Joi.string().min(1).max(25).required()
        },
    },

    // GET /v1/history/:userId
    getHistory: {
        params: {
            userId: Joi.string().required()
        },
    }
}