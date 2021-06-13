const container = require('../../src/loader');

const rabbitMQ = container.resolve('rabbitMQ');
const logger = container.resolve('logger');
const planetsRepository = container.resolve('planetsRepository');

const exchange = 'planets';
const q = 'deletePlanet';

rabbitMQ
  .then((conn) => {
    conn.createChannel(
      // eslint-disable-next-line prefer-arrow-callback
      function channelStart(err1, channel) {
        logger.info('[planet-delete] Initializing worker...');

        if (err1) {
          logger.error(
            `[planet-delete] Found error... ${JSON.stringify(err1)}`,
          );
          throw err1;
        }

        channel.assertExchange(exchange, 'direct', {
          durable: true,
        });

        channel.assertQueue(
          q,
          {
            durable: true,
          },
          (err2, listener) => {
            if (err2) {
              throw err2;
            }

            logger.info(
              `[planet-delete] Connection established, waiting for messages in ${listener.queue}`,
            );
            channel.bindQueue(listener.queue, exchange, 'deletePlanet');

            channel.consume(
              listener.queue,
              async (msg) => {
                try {
                  logger.info(
                    `[planet-delete] Received ${msg.content.toString()}`,
                  );

                  const planet = JSON.parse(msg.content);

                  await planetsRepository.delete(planet);

                  logger.info(`Deleted: ${JSON.stringify(planet)}`);
                } catch (processingError) {
                  logger.error(`Found error ${processingError}`);
                }
              },
              {
                noAck: true,
              },
            );
          },
        );
      },
    );
  })
  .catch((err) => logger.error(`Error found: ${JSON.stringify(err)}`));
