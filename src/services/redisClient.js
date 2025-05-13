// src/services/redisClient.js
const { createClient } = require("redis");
const logger = require("../utils/logger");
const {
  redisHost,
  redisPort,
  redisUsername,
  redisPassword,
  env,
} = require("../config/env");

const clientOptions = {
  socket: { host: redisHost, port: redisPort },
  // Solo incluye credenciales si existen
  ...(redisUsername && { username: redisUsername }),
  ...(redisPassword && { password: redisPassword }),
};

const client = createClient(clientOptions);

// 1) Manejo de eventos
client.on("error", (err) => {
  logger.error({ err }, "🔴 Redis Client Error");
});
client.on("ready", () => {
  logger.info(`🟢 Redis ready on ${redisHost}:${redisPort}`);
});
client.on("end", () => {
  logger.warn("Redis connection closed");
});

// 2) Función de inicialización
async function initRedis() {
  try {
    await client.connect();
  } catch (err) {
    logger.error({ err }, "🔥 Failed to connect to Redis");
    if (env !== "development") {
      // En producción, aborta el proceso para no arrancar en estado inconsistente
      process.exit(1);
    }
    // En desarrollo podemos seguir sin Redis
  }
}

// Ejecuta la inicialización inmediatamente
initRedis();

module.exports = client;
