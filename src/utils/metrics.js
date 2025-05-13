const client = require("prom-client");
client.collectDefaultMetrics();

const httpReqLatency = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "code"],
});

module.exports = { client, httpReqLatency };
