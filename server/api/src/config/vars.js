module.exports = {
  env: "development",
  port: "3000",
  jwtSecret:"bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4",
  jwtExpirationInterval: 60,
  mongo: {
    uri: "mongodb://localhost:27017/"
  },
  logs: 'combined',
  googlePlacesKey: "AIzaSyA_fgmevMEaWv19X13yXXSC_pYmm5EaSwA",
  googleMatrixKey: "AIzaSyAN5r0_AWwuPC2cHPDexRZlSfHFyZrkqx4"
};
