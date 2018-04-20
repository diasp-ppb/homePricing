let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let houseSchema = new mongoose.Schema({
    area: {
        type: String,
        lowercase: true,
    },
    bathrooms: {
        type: Number,
        minlength: 1,
    },
    description: {
        type: String,
        maxlength: 128,
    },
    zone: {
        type: String,
        maxlength: 128,
    },
    title: {
        type: String,
        maxlength: 128,
    },
    webpage: {
        type: String,
        trim: true,
    },
    characteristics: {
        type: String,
    },
    price: {
        type: String,
    },
    tipology: {
        type: String,
    },
    energyCertificate: {
        type: String,
    },
    address: {
        type: String,
    },
    condition: {
        type: String,
        maxlength: 128,
    },
}, {
        timestamps: true,
    });

houseSchema.statics = {

/**
 * Get house
 *
 * @param {ObjectId} id - The objectId of house.
 * @returns {Promise<House, APIError>}
 */
    async get(id) {
        try {
            let house;
            
            if (mongoose.Types.ObjectId.isValid(id)) {
                house = await this.findById(id).exec();
            }

            if (house) {
                return house;
            }

            throw new APIError({
                message: 'house does not exist',
                status: httpStatus.NOT_FOUND,
            });
        } catch (error) {
            throw error;
        }
    },
};

/**
 * @typedef House
 */
const House = mongoose.model('House', houseSchema);
module.exports = House;