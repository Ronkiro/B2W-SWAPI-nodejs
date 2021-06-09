module.exports = (
  { planetsModel },
  params = {},
  page = 1,
  sortBy = { name: "asc" },
  limit = 50
) =>
  planetsModel
    .find(params)
    .sort(sortBy)
    .limit(limit)
    .skip(limit * (page - 1));
