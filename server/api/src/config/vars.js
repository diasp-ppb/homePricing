module.exports = {
  env: "development",
  port: "3000",
  jwtSecret:"bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4",
  jwtExpirationInterval: 15,
  mongo: {
    uri: "mongodb://mongodb:27017/"
  },
  logs: 'combined',
};
