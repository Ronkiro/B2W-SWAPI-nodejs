const container = require('./awilix');
const mongoose = require('./mongoose');
const redis = require('./redis')
const SWAPI = require('./SWAPI');
const winston = require('./winston');

module.exports = {
  container,
  mongoose,
  redis,
  SWAPI,
  winston,
}