const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../utils/APIError');
const { env } = require('../../config/vars');

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
    transform() {
        const transformed = {};
        const fields = ['userId', 'houseId', 'createdAt'];

        fields.forEach((field) => {
            transformed[field] = this[field];
        });

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
            console.log(history)

            if (mongoose.Types.ObjectId.isValid(id)) {
                console.log("VALID");
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