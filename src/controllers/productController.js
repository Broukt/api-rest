const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const productService = require("../services/productService");
const { redisClient } = require("../middlewares/redisCacheMiddleware");

const invalidateListCache = async () => {
  await redisClient.del("/api/v1/products");
  const keys = await redisClient.keys("/api/v1/products*");
  if (keys.length) {
    await redisClient.del(keys);
  }
};

const createProduct = catchAsync(async (req, res, next) => {
  const product = await productService.createProduct(req.body);
  await invalidateListCache();
  res.status(201).json({ status: "success", data: { product } });
});

const getProduct = catchAsync(async (req, res, next) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) {
    return next(
      new AppError(`The product with id ${req.params.id} does not exist.`, 404)
    );
  }
  res.status(200).json({ status: "success", data: { product } });
});

const listProducts = catchAsync(async (req, res, next) => {
  const page = req.query.page;
  const limit = Math.min(req.query.limit, 100);
  const total = await productService.countProducts();
  const products = await productService.listProducts({
    skip: (page - 1) * limit,
    take: limit,
  });

  res.status(200).json({
    status: "success",
    results: products.length,
    total,
    page,
    limit,
    data: { products },
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  await productService.updateProduct(req.params.id, req.body);
  await invalidateListCache();
  res.status(204).end();
});

const deleteProduct = catchAsync(async (req, res, next) => {
  await productService.deactivateProduct(req.params.id);
  await invalidateListCache();
  res.status(204).end();
});

module.exports = {
  createProduct,
  getProduct,
  listProducts,
  updateProduct,
  deleteProduct,
};
