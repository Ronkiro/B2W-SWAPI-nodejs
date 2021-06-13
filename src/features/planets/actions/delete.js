module.exports = async (req, res) => {
  try {
    const { publisher } = req.container;

    // if (error) return  res.reply(400, 'Planeta inválido.');
    const planet = req.params.id ? { id: req.params.id } : req.body;

    if ('id' in planet) {
      // eslint-disable-next-line no-underscore-dangle
      planet._id = planet.id;
      delete planet.id;
    }

    publisher.send('planets', 'deletePlanet', planet);

    return res.reply(200, 'Planeta encaminhado para deleção com sucesso.', planet);
  } catch (err) {
    return res.reply(
      500,
      'Erro ao deletar planeta.',
      {},
      'Erro interno ao realizar a requisição.',
    );
  }
};
