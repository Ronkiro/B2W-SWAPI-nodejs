const planets = require('./planets')

module.exports = {
  v1Routers: [planets.router],
  planetsRepository: planets.repository,
  planetsValidations: planets.validations,
}