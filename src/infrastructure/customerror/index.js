module.exports = ({ logger }) => {
  process.on('unhandledRejection', (reason) => {
    throw reason; // let uncaught exception handle
  });
  process.on('uncaughtException', (error) => {
    logger.error(`Caught error: ${JSON.stringify(error)}`);
  });
};
