const search = async ({ SWAPIClient }, name) => {
  const url = `/planets/?search=${name}`;

  return SWAPIClient.get(url);
};

module.exports = search;
