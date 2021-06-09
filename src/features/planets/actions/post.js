module.exports = async (req, res, next) => {
  // TODO: CQS
  const { SWAPI, planetsRepository, planetsValidations } = req.container;

  const { error } = planetsValidations.planetCreateValidation.validate(req.body);
  if (error) return  res.reply(400, 'Planeta inválido.');

  const planet = req.body;
  const searchRes = (await SWAPI.planets.search(planet.name)).data;
  if (searchRes.count)
    planet.filmsCount = searchRes.results[0].films.length;
  await planetsRepository.save(planet);

  return res.reply(200, 'Planeta salvo com sucesso.');
}