const { googlePlaces, googleMatrix } = require('../services/houseInformationProviders');
const { googlePlacesKey, googleMatrixKey } = require('../../config/vars');

async function foundResults(key, house, type) {

    var result = await googlePlaces(key, house, type);

    if (result.status == 'OK') {
        return true;
    }
    
    return false;
}

function createObject(house, filters) {

    var obj = {};

    if (filters.hospital) {
        obj.hospital = foundResults(googlePlacesKey, house, 'hospital');
    }

    if (filters.school) {
        obj.hospital = foundResults(googlePlacesKey, house, 'school');
    }

    if (filters.shopping) {
        obj.hospital = foundResults(googlePlacesKey, house, 'shopping_mall');
    }

    if (filters.transport) {
        obj.hospital = foundResults(googlePlacesKey, house, 'bus_station');
    }

    return obj;
}

function checkObjectResults(result) {

    for (var key in result) {

        if (!result[key]) {
            return false;
        }
    }

    return true;
}

function verifyHouse(house, filters) {

    return new Promise(function (resolve) {

        var obj = createObject(house, filters);

        if (Object.keys(obj).length === 0) {
            resolve(false);
        }

        Promise.props(obj).then(function (result) {

            if (checkObjectResults(result)) {

                if (filters.workLocation != null && filters.workDistance != null) {

                    googleMatrix(googleMatrixKey, house, filters)
                        .then(function (res) {

                            if (res.status == "OK") {

                                try {
                                    var distance = res.rows[0].elements[0].distance.value;

                                    // Pass from km to m (units) and adds 999m (eg: 3999m is still 3km)
                                    if (distance <= Math.floor(filters.workDistance) * 1000 + 999) {
                                        resolve(true);
                                    }
                                    else {
                                        resolve(false);
                                    }
                                }
                                catch (error) {
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
            else {
                resolve(false);
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