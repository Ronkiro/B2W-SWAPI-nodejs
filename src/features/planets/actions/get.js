module.exports = async (req, res) => {
  const { planetsRepository } = req.container;
  let data;
  if (req.query.search || req.query.name) {
    data = await planetsRepository.search(
      req.query.name || req.query.search,
      req.query.page,
    );
  } else if (req.query.id) {
    data = await planetsRepository.searchId(req.query.id);
  } else {
    data = await planetsRepository.findAll(req.query.page || 1);
  }
  return res.reply(200, 'Planetas obtidos com sucesso!', data);
};
