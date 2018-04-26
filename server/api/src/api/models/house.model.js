let mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../utils/APIError');

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

houseSchema.method({

  transform() {
    console.log('------------------------- [ Got To house.Model ] --------------------');
    const transformed = {};
    const fields = ['id','area','price','energyCertificate','bathrooms','tipology','condition','address','zone','description'];

    fields.forEach(
      (field) => {
      transformed[field] = this[field];
    }
  );
    console.log(transformed)
    return transformed;
  }
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
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List houses.
   *
   * @param {number} skip - Number of houses to be skipped.
   * @param {number} limit - Limit number of houses to be returned.
   * @returns {Promise<House[]>}
   */
  list({
    page = 1, perPage = 10,
  }) {

    return this.find()
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
}

/**
 * @typedef House
 */
module.exports = mongoose.model('House', houseSchema);
