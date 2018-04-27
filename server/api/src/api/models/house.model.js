const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../utils/APIError');
const { env } = require('../../config/vars');

/**
 * House Schema
 * @private
 */
const houseSchema = new mongoose.Schema({
  bathrooms: {
    type: Number
  },
  description: {
    type: String,
    maxlength: 2500,
    required: true,
    trim: true,
  },
  area: {
    type: Number,
  },
  location: {
    type: String,
    trim: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 300
  },
  webpage: {
    type: String,
    trim: true,
  },
  characteristics: {
    type: Array,
  },
  price: {
    type: Number,
  },
  area: {
    type: Number,
  },
  tipology: {
    type: String,
    trim: true,
  },
  energyCertificate: {
    type: String,
    trim: true,
  },
  condition: {
    type: String,
    trim: true,
  },
  year: {
    type: Number,
  },
  images: {
    type: Array,
  },
}, {
    timestamps: true,
  });

/**
 * Methods
 */
houseSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'title', 'description', 'location', 'bathrooms', 'area', 'webpage', 'characteristics', 'price', 'area', 'tipology', 'energyCertificate', 'condition', 'year', 'images', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

/**
 * Statics
 */
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
        message: 'House does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List houses in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of houses to be skipped.
   * @param {number} limit - Limit number of houses to be returned.
   * @returns {Promise<House[]>}
   */
  list({
    page = 1, perPage = 30
  }) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

   /**
   * Filter houses in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of houses to be skipped.
   * @param {number} limit - Limit number of houses to be returned.
   * @returns {Promise<House[]>}
   */
  filter(params, page = 1, perPage = 30) {

    return this.find(params) 
      .sort({createdAt: -1})
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

/**
 * @typedef House
 */
module.exports = mongoose.model('House', houseSchema);