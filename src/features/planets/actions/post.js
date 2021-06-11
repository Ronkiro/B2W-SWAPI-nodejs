module.exports = async (req, res) => {
  try {
    // TODO: CQS
    const { SWAPI, planetsRepository, planetsValidations } = req.container;

    const { error } = planetsValidations.planetCreateValidation.validate(
      req.body,
    );
    if (error) return res.reply(400, 'Planeta inválido.', req.body, error);

    const planet = req.body;
    const searchRes = (await SWAPI.planets.search(planet.name)).data;
    planet.filmsCount = searchRes.count ? searchRes.results[0].films.length : 0;
    const createdPlanet = await planetsRepository.save(planet);

    return res.reply(200, 'Planeta salvo com sucesso.', createdPlanet);
  } catch (err) {
    return res.reply(500, 'Ocorreu um erro desconhecido ao salvar planeta.');
  }
};
