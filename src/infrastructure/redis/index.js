const Redis = require('redis');
const { promisify } = require("util");

module.exports = ({ cfg }) => {
  const connection = Redis.createClient({
    host: cfg.redis.host,
    port: cfg.redis.port,
  })

  connection.getAsync = promisify(connection.get).bind(connection);
  connection.setAsync = promisify(connection.set).bind(connection);
  
  return connection;
}