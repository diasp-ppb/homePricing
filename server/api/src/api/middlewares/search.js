const { googlePlaces, googleMatrix } = require('../services/houseInformationProviders');
const { googlePlacesKey, googleMatrixKey } = require('../../config/vars');

// TODO: I'm supposing we get a status: "OK" when returning true
async function foundResults (key, house, type) {
    var result = await googlePlaces(key, house, type);
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

            // Searches if there are any hospitals near
            if (filters.hospital && add) {
                add = await foundResults(googlePlacesKey, housesToFilter[house], 'hospital');
            }

            // Searches if there are any schools near
            if (filters.school && add) {
                add = await foundResults(googlePlacesKey, housesToFilter[house], 'school');
            }

            // Searches if there are any shoppings near
            if (filters.shopping && add) {
                add = await foundResults(googlePlacesKey, housesToFilter[house], 'shopping_mall');
            }

            // Searches if there are any transports near
            if (filters.transport && add) {
                add = await foundResults(googlePlacesKey, housesToFilter[house], 'bus_station');
            }

            if (add) {

                // If a work location and a given distance is specified, it is needed to calculate
                // the distance between the work location and the house location
                if (filters.workLocation != null && filters.workDistance != null) {
                    var result = await googleMatrix(googleMatrixKey, housesToFilter[house], filters);
                    var distance = result.rows[0].elements[0].distance.value;

                    // Pass from km to m (units) and adds 999m (eg: 3999m is still 3km)
                    if (distance <= filters.workDistance * 1000 + 999) {
                        houses.push(housesToFilter[house]);
                    }
                }
                else {
                    houses.push(housesToFilter[house]);
                }
            }
        }
    }

    return houses;
}