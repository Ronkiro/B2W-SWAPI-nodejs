module.exports = ({ planetsModel }, planet) => {
  return planetsModel.deleteMany(planet);
}
