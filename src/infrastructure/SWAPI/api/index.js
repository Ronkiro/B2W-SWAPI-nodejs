const axios = require('axios')

module.exports = ({ cfg }) => axios.create({
  baseURL: cfg.swapi.url,
})
