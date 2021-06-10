// API Service
const api = require('./api');
const planets = require('./planets');

// endpoints
module.exports = {
  api,
  interface: (opts) => ({
    planets: planets(opts),
  }),
};
