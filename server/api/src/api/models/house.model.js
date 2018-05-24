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
    type: Number,
    minlength: 1,
  },
  type: {
    type: String,
    trim: true,
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
  coordinates: [{
    type: Number,
  }],
  title: {
    type: String,
    required: true,
    maxlength: 300,
  },
  webpage: {
    type: String,
    trim: true,
  },
  characteristics: [{
    type: String,
  }],
  price: {
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
  images: [{
    type: String,
  }],
  address: {
    type: Object
  }
}, {
  timestamps: true,
});

/**
 * Methods
 */
houseSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'title', 'description', 'type', 'address', 'coordinates', 'bathrooms', 'area', 'webpage', 'characteristics', 'price', 'area', 'tipology', 'energyCertificate', 'condition', 'year', 'images', 'createdAt'];
    
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
   * Get house typology
   *
   * @param {ObjectId} id - The typology of house.
   * @returns {String}
   */
  async getHouseTypology(id) {
    try {
      let typology;

      if (mongoose.Types.ObjectId.isValid(id)) {
        typology = await this.findById(id).select({ tipology: 1, _id: 0 }).exec();
      }

      if (typology) {
        return typology;
      } else {
        return "";
      }

    } catch (error) {
      throw error;
    }
  },

  async getRecommendHouses(typologiesRecommendation, houseIdArray) {
    let recommendHouses = [];

    recommendHouses = await this.find({
      '$and': [
        { "_id": { '$nin': houseIdArray } },
        { "tipology": { '$in': typologiesRecommendation } }
      ],
    })
      .limit(6)
      .exec();

    return recommendHouses;
  },

  /**
   * List houses.
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
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

  async findByLocation(minLat, maxLat, minLong, maxLong, page = 1, perPage = 30) {
    const house = await this.find({
      $and: [
        { coordinates: { $elemMatch: { $gte: minLat, $lt: maxLat } } },
        { coordinates: { $elemMatch: { $gte: minLong, $lt: maxLong } } },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();

    return house;
  },

  async getAveragePrice(town, page = 1, perPage = 30) {
    const avgPrice = await this.aggregate(
      [
        {
          $group:
            {
              _id: "$address.town",
              avgAmount: { $avg: "$price" },
            },
        },
        {
          $match: { _id: town }
        },

      ])
      .cursor({ batchSize: 2000000 })
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec()
      .toArray();
      
      console.log("IMPRIME: " + avgPrice);

    return avgPrice;
  },
};

/**
 * @typedef House
 */
module.exports = mongoose.model('House', houseSchema);
