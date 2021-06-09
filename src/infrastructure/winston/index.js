const winston = require('winston')
const {combine,timestamp,printf} = winston.format;


const myFormat = printf(info => {
    return `[app] ${info.level.toUpperCase()}: ${info.message} - ${info.timestamp}`;
});

module.exports = ({ cfg }) => 
  winston.createLogger({
    format: combine(
      timestamp(),
      myFormat
    ),
    transports: [new winston.transports.Console({
      level: cfg.logger.level
    })],
  });
