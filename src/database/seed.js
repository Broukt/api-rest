const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log("🔄 Starting database seeding...");
    const productsPath = path.resolve(__dirname, "../../mock/products.json");
    const productsData = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

    await prisma.product.deleteMany();

    console.log(`🛠 Seeding ${productsData.length} products...`);

    for (const product of productsData) {
      await prisma.product.create({ data: product });
    }

    console.log("✅ Database seeding completed successfully.");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    console.log("🔌 Prisma Client disconnected");
  });
