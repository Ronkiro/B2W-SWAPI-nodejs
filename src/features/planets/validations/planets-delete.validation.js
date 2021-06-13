const Joi = require('joi-oid');

module.exports = Joi.object({
  _id: Joi.objectId().required(),
});
