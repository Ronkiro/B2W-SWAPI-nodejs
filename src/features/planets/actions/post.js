module.exports = async (req, res) => {
  try {
    const { publisher, planetsValidations } = req.container;

    const planet = req.body;
    const { error } = planetsValidations.planetCreateValidation.validate(
      req.body,
    );
    if (error) return res.reply(400, 'Planeta inválido.', req.body, error);

    publisher.send('planets', 'createPlanet', planet);

    return res.reply(200, 'O planeta está sendo processado com sucesso.', planet);
  } catch (err) {
    return res.reply(
      500,
      'Ocorreu um erro desconhecido ao salvar planeta.',
      {},
      'Erro interno ao realizar requisição.',
    );
  }
};
