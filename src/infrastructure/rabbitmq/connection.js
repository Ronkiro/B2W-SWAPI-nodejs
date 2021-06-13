const AMQP = require('amqplib/callback_api');

module.exports = ({ cfg }) => new Promise((res) => AMQP.connect(
  {
    protocol: 'amqp',
    hostname: cfg.rabbitmq.host,
    port: cfg.rabbitmq.port,
    username: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASS,
    vhost: '/',
  },
  (err, conn) => {
    if (err) {
      throw err;
    } else {
      res(conn);
    }
  },
));
