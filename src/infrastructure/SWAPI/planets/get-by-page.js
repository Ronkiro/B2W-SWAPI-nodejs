const SWAPIClient = require('../api')

const getByPage = (page) => {
  const pageQuery = page? `?page=${page}` : "";
  const url = `/planets/${pageQuery}`;
  
  return SWAPIClient.get(url);
}

module.exports = getByPage