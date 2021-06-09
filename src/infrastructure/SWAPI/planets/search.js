const SWAPIClient = require('../api')

const search = (name) => {
  const url = `/planets/?search=${name}`;
  
  return SWAPIClient.get(url);
}

module.exports = search