const save = require('./save');
const search = require('./search');

module.exports = ({ planetsModel }) => ({
  save: (planet) => save({ planetsModel }, planet),
  search: (params, page=1) => search({ planetsModel }, params, page),
  findAll: (page=1) => search({ planetsModel }, {}, page),
})