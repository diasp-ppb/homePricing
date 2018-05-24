let mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../utils/APIError');

const Favorite = require('./favorite.model');
const House = require('./house.model');

module.exports = {
    transform: function() {
        const transformed = {};
        const fields = ['id', 'title', 'description', 'type', 'address', 'coordinates', 'bathrooms', 'area', 'webpage', 'characteristics', 'price', 'area', 'tipology', 'energyCertificate', 'condition', 'year', 'images', 'createdAt'];

        fields.forEach(
            (field) => {
                transformed[field] = this[field];
            }
        );
        console.log(transformed)
        return transformed;
    },

    getHousesId: function (favorites) {
        var houseIdArray = [];
        favorites.forEach((favorite, index) => {
            houseIdArray[index] = favorite.houseId;
        });

        return houseIdArray;
    },

    getHouseTypology: async function(id) {
        const houseTypology = await House.getHouseTypology(id);
        return houseTypology;
    },
 
    countHousesTypologies: function(typologies_array) {
        var typologies = [], occurrences = [], prev;

        typologies_array.sort();
        for (var i = 0; i < typologies_array.length; i++) {
            if (typologies_array[i] !== prev) {
                typologies.push(typologies_array[i]);
                occurrences.push(1);
            } else {
                occurrences[occurrences.length - 1]++;
            }
            prev = typologies_array[i];
        }

        return [typologies, occurrences];
    },

    getLargestNumberTypologiesArray: function(occurrences) {
        var number = -1, j = 0;
        var index = [];
        var typologies = occurrences[0];
        var nrTypologies = occurrences[1];

        for (var i = 0; i < typologies.length; i++) {
            if (nrTypologies[i] > number) {
                number = nrTypologies[i];
            }
        }

        for (var i = 0; i < typologies.length; i++) {
            if (nrTypologies[i] == number) {
                index[j] = typologies[i];
                j++;
            }
        }

        return index;
    },

    analyseFavorites: async function(houseIdArray) {
        var typologies = [];
        var occurrences = [];
        var index = [];
        var recommendHouses = [];

        var i;
        for (i = 0; i < houseIdArray.length; i++) { 
            const houseTypology = await this.getHouseTypology(houseIdArray[i]);
            if (houseTypology.typology != "") {
                typologies[i] = houseTypology.tipology;
            }
        }

        occurrences = this.countHousesTypologies(typologies);
        typologiesRecommendation = this.getLargestNumberTypologiesArray(occurrences);
        recommendHouses = await House.getRecommendHouses(typologiesRecommendation, houseIdArray);

        console.log("€€€€ " + recommendHouses);

        return recommendHouses;
    },

    /**
     * Get user recommendations
     *
     * @param {string} userId - id of the user
     */
    list: async function(userId) {
        var recommendHouses = [];
        const favorites = await Favorite.get(userId);
        var houseIdArray = this.getHousesId(favorites);

        if (houseIdArray.length > 0)
            recommendHouses = this.analyseFavorites(houseIdArray);

        return recommendHouses;
    },
}

/**recommendationsSchema.statics = {
    list() {
        return this.find();
    },

    /**
     * Get user recommendations
     *
     * @param {string} userId - id of the user
     */
    //get(params) {
    //    return this.find(params);
  //  }
//}

/**
 * @typedef Recommendations
 */
//module.exports = mongoose.model('Recommendations', recommendationsSchema);
