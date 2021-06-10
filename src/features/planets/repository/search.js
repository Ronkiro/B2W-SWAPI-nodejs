module.exports = async (
  { planetsModel, redis },
  params = {},
  page = 1,
  sortBy = { name: 'asc' },
  limit = 50,
) => {
  let returnData;

  if (!Object.keys(params).length) {
    // caching strategy
    const planetsAllCachedData = await redis.getAsync(`Planets_all_${page}`);
    if (planetsAllCachedData) {
      // cache hit
      returnData = JSON.parse(planetsAllCachedData);
    } else {
      // cache miss
      returnData = await planetsModel
        .find(params)
        .sort(sortBy)
        .limit(limit)
        .skip(limit * (page - 1));
      await redis.setAsync(
        `Planets_all_${page}`,
        JSON.stringify(returnData),
        'EX', // seconds
        30, // TTL
      );
    }
    return returnData;
  }

  return planetsModel
    .find(params)
    .sort(sortBy)
    .limit(limit)
    .skip(limit * (page - 1));
};
