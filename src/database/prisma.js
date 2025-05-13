const { PrismaClient } = require("@prisma/client");
const { env } = require("../config/env");
let prisma;
if (env === "production") prisma = new PrismaClient();
else {
  if (!global.prisma)
    global.prisma = new PrismaClient({ log: ["query", "warn", "error"] });
  prisma = global.prisma;
}
module.exports = prisma;
