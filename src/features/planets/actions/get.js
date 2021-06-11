module.exports = async (req, res) => {
  try {
    const { planetsRepository } = req.container;
    let data;
    if (req.query.search || req.query.name) {
      data = await planetsRepository.search(
        req.query.name || req.query.search,
        req.query.page,
      );
    } else if (req.query.id) {
      try {
        data = await planetsRepository.searchId(req.query.id);
      } catch (err) {
        if (err.name === 'CastError') {
          return res.reply(400, 'ID inválido fornecido.', []);
        }
        throw err;
      }
    } else {
      data = await planetsRepository.findAll(req.query.page || 1);
    }
    return res.reply(200, 'Planetas obtidos com sucesso!', data || []);
  } catch (err) {
    return res.reply(
      500,
      'Ocorreu um erro desconhecido ao salvar planeta.',
      {},
      'Erro interno ao realizar requisição.',
    );
  }
};
