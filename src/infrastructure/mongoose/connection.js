const mongoose = require('mongoose');
const config = require('config');

const { MONGO_USERNAME, MONGO_PASSWORD } = process.env

// mongoose.connection
//     .on('error', console.log)
//     .on('disconnected', connect)
//     .once('open', listen);


const connectionUrl = `mongodb://${config.mongo.host}:${config.mongo.port}/SWAPI?authSource=admin`

const conn = mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: MONGO_USERNAME,
  pass: MONGO_PASSWORD
}).catch(console.log);

module.exports = conn;