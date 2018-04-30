const { googlePlaces, googleMatrix } = require('../services/houseInformationProviders');
const { googlePlacesKey, googleMatrixKey } = require('../../config/vars');

// TODO: I'm supposing we get a status: "OK" when returning true
async function foundResults(key, house, type) {
    var result = await googlePlaces(key, house, type);
    if (result.status == 'ZERO_RESULTS') {
        return false;
    }
    return true;
}

function verifyHouse(house, filters) {

    return new Promise(function (resolve) {
        var hospital = true, school = true, shopping = true, transport = true;

        Promise.props({
            hospital: foundResults(googlePlacesKey, house, 'hospital'),
            school: foundResults(googlePlacesKey, house, 'school'),
            shopping: foundResults(googlePlacesKey, house, 'shopping_mall'),
            transport: foundResults(googlePlacesKey, house, 'bus_station')

        }).then(function (result) {
            if (hospital && school && shopping && transport) {
                if (filters.workLocation != null && filters.workDistance != null) {
                    googleMatrix(googleMatrixKey, house, filters)
                        .then(function (result) {
                            if (result.status == "OK") {
                                var distance = result.rows[0].elements[0].distance.value;

                                // Pass from km to m (units) and adds 999m (eg: 3999m is still 3km)
                                if (distance <= Math.floor(filters.workDistance) * 1000 + 999) {
                                    resolve(true);
                                }
                                else {
                                    resolve(false);
                                }
                            }
                            else {
                                resolve(false);
                            }
                        })
                }
                else {
                    resolve(true);
                }
            }
        })
    })
}

exports.searchHouses = async function (housesToFilter, filters) {
    var houses = [];

    for (house in housesToFilter) {

        if (housesToFilter[house].coordinates.length != 0) {

            var result = await verifyHouse(housesToFilter[house], filters);

            if (result) {
                houses.push(housesToFilter[house]);
            }
        }
    }
    return houses;
}