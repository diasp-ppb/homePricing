const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../utils/APIError');
const { env } = require('../../config/vars');
const House = require('./house.model');

/**
 * History Schema
 * @private
 */
const historySchema = new mongoose.Schema({
    userId: {
        type: String,
        trim: true
    },
    houseId: {
        type: String,
        trim: true,
    }
}, {
        timestamps: true,
    });

/**
 * Methods
 */
historySchema.method({
    async transform() {
        const transformed = {};
        const fields = ['userId', 'createdAt'];

        try {
            const house = await House.get(this['houseId']);
            transformed['house'] = house.transform();

            fields.forEach((field) => {
                transformed[field] = this[field];
            });
        } catch (error) {
            console.log(error)
        }

        return transformed;
    }
});

/**
 * Statics
 */
historySchema.statics = {

    /**
     * Get history
     *
     * @param {ObjectId} id - The userId.
     * @returns {Promise<History, APIError>}
     */
    async get(id) {
        try {
            let history = await this.find(id).exec();

            if (mongoose.Types.ObjectId.isValid(id)) {
                history = await this.find(id).exec();
            }
            if (history) {
                return history;
            }

            throw new APIError({
                message: 'UserId does not exist',
                status: httpStatus.NOT_FOUND,
            });
        } catch (error) {
            throw error;
        }
    },
    list() {
        let history = this.find();
        return history;
    }
};

/**
 * @typedef History
 */
module.exports = mongoose.model('History', historySchema);