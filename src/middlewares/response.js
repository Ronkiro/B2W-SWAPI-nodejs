module.exports = (req, res, next) => {
  res.reply = (status, msg = '', data = {}, error = '', type = 'json') => {
    const parsedError = {
      message: error,
      exists: !!error,
    };

    return res.status(status).type(type).send({
      data,
      status,
      error: parsedError,
      msg,
    });
  };

  next();
};
