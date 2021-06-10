module.exports = async (req, res, next) => {
  // TODO: CQS
  const { planetsRepository, planetsValidations } = req.container;

  // const { error } = planetsValidations.planetCreateValidation.validate(req.body);
  // if (error) return  res.reply(400, 'Planeta inválido.');
  let planet = req.body;

  if(planet.hasOwnProperty("id")) {
    planet._id = planet.id
    delete planet.id;
  }

  await planetsRepository.delete(planet);

  return res.reply(200, 'Planeta deletado com sucesso.');
}