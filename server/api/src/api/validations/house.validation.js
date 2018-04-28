const Joi = require('joi');

var year = new Date().getFullYear();

module.exports = {

    // POST /v1/houses
    // PATCH /v1/houses/:houseId
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
            price: Joi.number().positive(),
            tipology: Joi.string().regex(/^T\d$/),
            energyCertificate: Joi.string(),
            condition: Joi.string(),
            year: Joi.number().min(1000).max(year),
            type: Joi.string().regex(/^(rent)|(buy)$/)
        },
    },

    // VALIDATE REQUEST /v1/houses/filter 
    request: {
        body: {
            rent: Joi.boolean().required(),
            buy: Joi.boolean().required(),
            tipology: Joi.string().allow(null).regex(/^T\d$/).required(),
            bathrooms: Joi.number().min(0).allow(null).required(),
            minArea: Joi.number().positive().allow(null).required(),
            maxArea: Joi.number()
                .when('minArea', {is: null, then: Joi.number().positive().allow(null).required()})
                .when('minArea', {is: Joi.number(), then: Joi.number().greater(Joi.ref('minArea')).allow(null).required()}),
            minPrice: Joi.number().positive().allow(null).required(),
            maxPrice: Joi.number()
                .when('minPrice', {is: null, then: Joi.number().positive().allow(null).required()})
                .when('minPrice', {is: Joi.number(), then: Joi.number().greater(Joi.ref('minPrice')).allow(null).required()}),
            hospital: Joi.boolean().required(),
            school: Joi.boolean().required(),
            shopping: Joi.boolean().required(),
            transport: Joi.boolean().required()
        },
    },

    //TODO: Add more verifications
}