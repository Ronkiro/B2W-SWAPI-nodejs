module.exports = async (req, res) => {
  try {
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
  } catch (err) {
    return res.reply(
      500,
      'Erro ao deletar planeta.',
      {},
      'Erro interno ao realizar a requisição.',
    );
  }
};
