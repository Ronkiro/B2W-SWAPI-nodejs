const container = require('./awilix');
const customerror = require('./customerror');
const mongoose = require('./mongoose');
const rabbitmq = require('./rabbitmq');
const redis = require('./redis');
const SWAPI = require('./SWAPI');
const winston = require('./winston');

module.exports = {
  container,
  customerror,
  mongoose,
  rabbitmq,
  redis,
  SWAPI,
  winston,
};
