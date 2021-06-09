module.exports = async(req, res, next) => {
  const { planetsRepository } = req.container;
  data = await planetsRepository.findAll(req.query.page || 1);
  return res.reply(200, 'Planetas obtidos com sucesso!', data);
}