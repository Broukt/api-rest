const client = require("../services/redisClient");

module.exports = {
  cacheMiddleware:
    (ttl = 60) =>
    async (req, res, next) => {
      if (req.method !== "GET") return next();
      const key = req.originalUrl;
      const cached = await client.get(key);
      if (cached) return res.json(JSON.parse(cached));

      const send = res.json.bind(res);
      res.json = (data) => {
        client.setEx(key, ttl, JSON.stringify(data));
        return send(data);
      };
      next();
    },
  redisClient: client,
};
