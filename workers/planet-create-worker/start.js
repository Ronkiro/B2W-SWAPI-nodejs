const container = require('../../src/loader');

const rabbitMQ = container.resolve('rabbitMQ');
const logger = container.resolve('logger');
const SWAPI = container.resolve('SWAPI');
const planetsRepository = container.resolve('planetsRepository');

const exchange = 'planets';
const q = 'createPlanet';

rabbitMQ
  .then((conn) => {
    conn.createChannel(
      // eslint-disable-next-line prefer-arrow-callback
      function channelStart(err1, channel) {
        logger.info('[planet-create] Initializing worker...');

        if (err1) {
          logger.error(
            `[planet-create] Found error... ${JSON.stringify(err1)}`,
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
              `[planet-create] Connection established, waiting for messages in ${listener.queue}`,
            );
            channel.bindQueue(listener.queue, exchange, 'createPlanet');

            channel.consume(
              listener.queue,
              async (msg) => {
                try {
                  logger.info(
                    `[planet-create] Received ${msg.content.toString()}`,
                  );

                  const planet = JSON.parse(msg.content);

                  const searchRes = (await SWAPI.planets.search(planet.name)).data;
                  planet.filmsCount = searchRes.count ? searchRes.results[0].films.length : 0;
                  const createdPlanet = await planetsRepository.save(planet);

                  logger.info(`Created: ${JSON.stringify(createdPlanet)}`);
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
