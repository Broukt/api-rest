const router = require("express").Router();
const protect = require("../../middlewares/authMiddleware");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../../middlewares/validateMiddleware");
const {
  createProductValidator,
  updateProductValidator,
  idParamValidator,
  listProductsQueryValidator,
} = require("../../validators/productValidator");
const {
  createProduct,
  getProduct,
  listProducts,
  updateProduct,
  deleteProduct,
} = require("../../controllers/productController");

router.use(protect);

router
  .route("/")
  .get(validateQuery(listProductsQueryValidator), listProducts)
  .post(validateBody(createProductValidator), createProduct);

router
  .route("/:id")
  .get(validateParams(idParamValidator), getProduct)
  .patch(
    validateParams(idParamValidator),
    validateBody(updateProductValidator),
    updateProduct
  )
  .delete(validateParams(idParamValidator), deleteProduct);

module.exports = router;
