const YAML = require("js-yaml");
const fs = require("fs");
const path = require("path");

const swaggerDocument = YAML.load(
  fs.readFileSync(path.join(__dirname, "swagger.yaml"), "utf8")
);
module.exports = swaggerDocument;
