const Mongoose = require('mongoose');

module.exports = ({ schemas }) => 
  Mongoose.model('Planets', schemas.planetSchema)