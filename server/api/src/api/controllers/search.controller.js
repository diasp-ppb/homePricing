const httpStatus = require('http-status');
const User = require('../models/user.model');
//const User = require('../models/database.model');
const RefreshToken = require('../models/refreshToken.model');
const moment = require('moment-timezone');
const { jwtExpirationInterval } = require('../../config/vars');



// Send query to receive data
exports.houses = (req, res) => res.json("OLA");
