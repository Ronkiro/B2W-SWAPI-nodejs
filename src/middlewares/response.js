module.exports = (req, res, next) => {
  res.reply = (status, msg = "", data = {}, error="", type = "json") => {
    const _error = {
      message: error,
      exists: false,
    };

    return res.status(status).type(type).send({
      data,
      status,
      error: _error,
      msg,
    });
  }
  
  next();
};
