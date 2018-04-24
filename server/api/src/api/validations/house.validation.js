const Joi = require('joi');

var year = new Date().getFullYear();

module.exports = {

    // POST & PATCH /v1/houses
    houseInsert: {
        body: {
            page: Joi.number().min(1),
            perPage: Joi.number().min(1).max(100),
            bathrooms: Joi.number().min(0),
            description: Joi.string().min(1).max(2500).required(),
            area: Joi.number().min(1),
            location: Joi.string().min(1),
            title: Joi.string().min(1).max(300).required(),
            webpage: Joi.string().min(1),
            price: Joi.number().min(1),
            tipology: Joi.string(), //.regex(/^T[0-1][+[0-9]]?$/);
            energyCertificate: Joi.string(),
            condition: Joi.string(),
            year: Joi.number().min(1000).max(year),
        },
    },

    //TODO: Add more verifications
}