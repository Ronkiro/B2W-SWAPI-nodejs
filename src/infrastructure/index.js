const container = require('./awilix');
const customerror = require('./customerror');
const mongoose = require('./mongoose');
const redis = require('./redis');
const SWAPI = require('./SWAPI');
const winston = require('./winston');

module.exports = {
  container,
  customerror,
  mongoose,
  redis,
  SWAPI,
  winston,
};
