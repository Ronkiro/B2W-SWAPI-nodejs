const container = require('./infrastructure/awilix');

// management
const { 
  asValue,
  asFunction,
  asClass
} = require('awilix');

// modules
const config = require('config');
const logger = require('./infrastructure/winston')
const SWAPI = require('./infrastructure/SWAPI')

// resources
const routersList = require('./features')

container.register({
  cfg: asValue(config),
  logger: asFunction(logger).singleton(),
  v1Routers: asValue(routersList),
  SWAPIClient: asFunction(SWAPI.api).singleton(),
  SWAPI: asValue(SWAPI),
})

module.exports = container