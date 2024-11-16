const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  res.on('finish', () => {
    logger.info(`Response: ${res.statusCode}`);
  });
  next();
};
