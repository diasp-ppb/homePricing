const google = require('../services/houseInformationProviders').google;
const key = require('../../config/vars').googleKey;

async function foundResults (key, house, type) {
    var result = await google(key, house, type);
    if (result.status == 'ZERO_RESULTS') {
        return false;
    }
    return true;
}

exports.searchHouses = async function (housesToFilter, filters) {
    var houses = [];

    for (house in housesToFilter) {

        if (housesToFilter[house].coordinates.length != 0) {

            var add = true; 

            if (filters.hospital && add) {
                add = await foundResults(key, housesToFilter[house], 'hospital');
            }

            if (filters.school && add) {
                add = await foundResults(key, housesToFilter[house], 'school');
            }

            if (filters.shopping && add) {
                add = await foundResults(key, housesToFilter[house], 'shopping_mall');
            }

            if (filters.transport && add) {
                add = await foundResults(key, housesToFilter[house], 'bus_station');
            }

            if (add) {
                houses.push(housesToFilter[house]);
            }
        }
    }
    return houses;
}