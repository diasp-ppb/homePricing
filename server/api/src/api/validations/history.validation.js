const Joi = require('joi');

module.exports = {

    // POST /v1/history
    createHistory: {
        body: {
            userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
            houseId: Joi.string().regex(/^[a-fA-F0-9]$/).min(1).max(25).required()
        },
    },

    // GET /v1/history/:userId
    getHistory: {
        params: {
            userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
        },
    }
}