const del = require('./delete');
const save = require("./save");
const search = require("./search");
const searchById = require("./searchById");

module.exports = ({ planetsModel, redis }) => ({
  findAll: (page = 1) => search({ planetsModel, redis }, {}, page),
  delete: (planet) => del({ planetsModel }, planet),
  save: (planet) => save({ planetsModel }, planet),
  search: (name, page = 1) =>
    search({ planetsModel }, { name: { $regex: name, $options: "i" } }, page),
  searchId: (id) => searchById({ planetsModel }, id),
});
