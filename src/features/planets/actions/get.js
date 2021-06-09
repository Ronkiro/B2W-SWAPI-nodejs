module.exports = async(req, res, next) => {
  const { SWAPI } = req.container;
  let data = null;

  if (req.query.search) {
    data = (await SWAPI.planets.search(req.query.search)).data
  } else if (req.query.page) {
    data = (await SWAPI.planets.getByPage(req.query.page)).data
  } else {
    data = (await SWAPI.planets.getByPage(1)).data
  }
  
  return res.reply(200, 'Teste OK', data);
}