module.exports = async (req, res) => {
  // TODO: CQS
  const { planetsRepository } = req.container;

  // if (error) return  res.reply(400, 'Planeta inválido.');
  const planet = req.params.id ? { id: req.params.id } : req.body;

  if ('id' in planet) {
    // eslint-disable-next-line no-underscore-dangle
    planet._id = planet.id;
    delete planet.id;
  }

  await planetsRepository.delete(planet);

  return res.reply(200, 'Planeta deletado com sucesso.', planet);
};
