let mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../utils/APIError');

let favoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    lowercase: true,
    index: true
  },
  houseId: {
    type: String,
    lowercase: true,
    index: true
  }
}, {
  timestamps: true
});

favoriteSchema.index({ userId: 1, houseId: 1 }, { unique: true });

favoriteSchema.method({

  transform() {
    const transformed = {};
    const fields = ['userId','houseId'];

    fields.forEach(
      (field) => {
      transformed[field] = this[field];
    }
  );
    console.log(transformed)
    return transformed;
  }
});

favoriteSchema.statics = {
  list() {
    return this.find();
  },

  /**
   * Get user favorites
   *
   * @param {string} userId - id of the user
   */
  get(params) {
    return this.find(params);
  },

  removeFav(params){
      return this.remove(params);
  }

}

/**
 * @typedef Favorite
 */
module.exports = mongoose.model('Favorite', favoriteSchema);
