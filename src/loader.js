// management
const { asValue, asFunction } = require('awilix');

// modules
const config = require('config');
const {
  winston,
  mongoose,
  SWAPI,
  container,
  redis,
  customerror,
} = require('./infrastructure');
const features = require('./features');

// resources
const routersList = features.v1Routers;

// models
const { models } = require('./domain');

container.register({
  cfg: asValue(config),
  errorHandler: asFunction(customerror).singleton(),
  logger: asFunction(winston).singleton(),
  mongoConnection: asValue(mongoose.connection),
  planetsModel: asFunction(models.Planets).singleton(),
  planetsRepository: asFunction(features.planetsRepository).singleton(),
  planetsValidations: asValue(features.planetsValidations),
  redis: asFunction(redis).singleton(),
  schemas: asValue(mongoose.schemas),
  SWAPIClient: asFunction(SWAPI.api).singleton(),
  SWAPI: asFunction(SWAPI.interface).singleton(),
  v1Routers: asValue(routersList),
});

module.exports = container;
