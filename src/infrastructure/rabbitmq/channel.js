module.exports = ({ rabbitMQ, logger }) => {
  let channel;

  const init = async () => {
    channel = (await rabbitMQ).createChannel();
    return channel;
  };

  const close = async () => {
    if (channel) await channel.close();
  };

  const send = async (exchange, queue, msg) => {
    try {
      await init();

      channel.assertExchange(exchange, 'direct', { durable: true });

      channel.assertQueue(queue, {
        durable: true,
      });

      channel.publish(exchange, queue, Buffer.from(JSON.stringify(msg)));
    } catch (err) {
      logger.error(JSON.stringify(err));
    } finally {
      await close();
    }
  };

  return {
    init,
    close,
    send,
  };
};
