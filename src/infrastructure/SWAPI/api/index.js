const cfg = require('config');
const axios = require('axios')

module.exports = axios.create({
  baseURL: cfg.swapi.url,
})
