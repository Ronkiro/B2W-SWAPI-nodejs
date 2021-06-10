const getByPage = ({ SWAPIClient }, page) => {
  const pageQuery = page ? `?page=${page}` : '';
  const url = `/planets/${pageQuery}`;

  return SWAPIClient.get(url);
};

module.exports = getByPage;
