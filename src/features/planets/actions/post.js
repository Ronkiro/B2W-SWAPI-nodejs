module.exports = async (req, res) => {
  // TODO: CQS
  const { SWAPI, planetsRepository, planetsValidations } = req.container;

  const { error } = planetsValidations.planetCreateValidation.validate(
    req.body,
  );
  if (error) return res.reply(400, 'Planeta inválido.', req.body, error);

  const planet = req.body;
  const searchRes = (await SWAPI.planets.search(planet.name)).data;
  if (searchRes.count) {
    planet.filmsCount = searchRes.results[0].films.length;
    const createdPlanet = await planetsRepository.save(planet);

    return res.reply(200, 'Planeta salvo com sucesso.', createdPlanet);
  }
  return res.reply(500, 'Ocorreu um erro desconhecido ao salvar planeta.');
};
