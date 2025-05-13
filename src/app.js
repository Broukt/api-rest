const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const pinoHttp = require("pino-http");
const compression = require("compression");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger");

const sanitize = require("./middlewares/sanitizeMiddleware");
const { cacheMiddleware } = require("./middlewares/redisCacheMiddleware");
const { client: promClient, httpReqLatency } = require("./utils/metrics");

const config = require("./config/env");
const logger = require("./utils/logger");
const productRouter = require("./routes/v1/productRoutes");
const globalErrorHandler = require("./middlewares/globalErrorMiddleware");

const app = express();

app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { status: "fail", message: "Too many requests." },
  })
);
app.use(compression());
app.use(express.json());
app.use(sanitize);
app.use(hpp({ whitelist: ["tags"] }));
app.use((req, res, next) => {
  const end = httpReqLatency.startTimer({
    method: req.method,
    route: req.path,
  });
  res.on("finish", () => {
    end({ code: res.statusCode });
  });
  next();
});
app.use("/api/v1/products", cacheMiddleware(120), productRouter);
app.get("/healthz", (req, res) =>
  res.status(200).json({ status: "success", uptime: process.uptime() })
);
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", promClient.register.contentType);
  res.end(await promClient.register.metrics());
});
app.use(globalErrorHandler);

if (config.env === "development") {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true })
  );
}
module.exports = app;
