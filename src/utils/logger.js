const pino = require("pino");
const { env } = require("../config/env");

const logger = pino({
  level: env === "development" ? "debug" : "info",
  transport:
    env === "development"
      ? {
          target: "pino-pretty",
          options: { colorize: true, translateTime: "SYS:standard" },
        }
      : undefined,
});

module.exports = logger;
