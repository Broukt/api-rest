const app = require("./src/app");
const config = require("./src/config/env");
const logger = require("./src/utils/logger");
const redisClient = require("./src/services/redisClient");

const PORT = config.port || process.env.PORT || 3000;

redisClient
  .ping()
  .then(() => {
    app.listen(config.port, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error({ err }, "Redis ping failed—aborting startup");
    process.exit(1);
  });
