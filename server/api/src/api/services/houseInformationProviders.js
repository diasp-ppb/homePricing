/* eslint-disable camelcase */
const axios = require('axios');

/**
 * Use Google Places API to retrieve information about points of interest
 * https://developers.google.com/places/web-service/search
 */
exports.google = async (key, data, type) => {
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const params = { 
    key: key,
    radius: 5000,
    location: data.coordinates[0] + "," + data.coordinates[1],
    type: type
   };
  const response = await axios.get(url, { params });

  return response.data;
};
