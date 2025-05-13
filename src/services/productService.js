const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createProduct = (data) => prisma.product.create({ data });

const getProductById = (id) => prisma.product.findUnique({ where: { id } });

const countProducts = () => prisma.product.count();

const listProducts = ({ skip, take }) =>
  prisma.product.findMany({ skip, take });

const updateProduct = (id, data) =>
  prisma.product.update({ where: { id }, data });

const deactivateProduct = (id) =>
  prisma.product.update({ where: { id }, data: { isActive: false } });

module.exports = {
  createProduct,
  getProductById,
  countProducts,
  listProducts,
  updateProduct,
  deactivateProduct,
};
