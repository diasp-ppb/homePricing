/* eslint-disable camelcase */
const axios = require('axios');

/**
 * Use Google Places API to retrieve information about points of interest
 * https://developers.google.com/places/web-service/search
 */
exports.googlePlaces = async (key, data, type) => {
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

exports.googleMatrix = async (key, data, filters) => {
  const url = 'https://maps.googleapis.com/maps/api/distancematrix/json';
  const params = {
    key: key,
    origins: "place_id:" + filters.workLocation,
    destinations: data.coordinates[0] + "," + data.coordinates[1]
  };
  const response = await axios.get(url, { params });

  return response.data;
};

//41.1556608,-8.6022932|place_id:ChIJ3S-JXmauEmsRUcIaWtf4MzE