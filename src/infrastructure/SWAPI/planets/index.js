const getByPage = require('./get-by-page');
const search = require('./search');

module.exports = (opts) => ({
  getByPage: (page) => getByPage(opts, page),
  search: (name) => search(opts, name),
});
