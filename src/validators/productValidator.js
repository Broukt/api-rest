const { z } = require("zod");

const createProductValidator = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be at most 50 characters" }),
  sku: z
    .string({ required_error: "SKU is required" })
    .min(1, { message: "SKU is required" })
    .max(30, { message: "SKU must be at most 30 characters" }),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .int({ message: "Price must be an integer" })
    .positive({ message: "Price must be a positive number" }),
  stock: z
    .number({
      required_error: "Stock is required",
      invalid_type_error: "Stock must be a number",
    })
    .int({ message: "Stock must be an integer" })
    .nonnegative({ message: "Stock must be a non-negative integer" }),
  isActive: z
    .boolean({ invalid_type_error: "isActive must be a boolean" })
    .optional()
    .default(true),
});

const updateProductValidator = createProductValidator.partial();

const idParamValidator = z.object({
  id: z
    .string({ required_error: "Id is required" })
    .uuid({ message: "Id must be a valid UUID" }),
});

const listProductsQueryValidator = z.object({
  page: z
    .preprocess((val) => {
      if (typeof val === "string" && val.trim() !== "") {
        const n = parseInt(val, 10);
        return isNaN(n) ? undefined : n;
      }
      return undefined;
    }, z.number().int().positive().default(1))
    .optional(),
  limit: z
    .preprocess((val) => {
      if (typeof val === "string" && val.trim() !== "") {
        const n = parseInt(val, 10);
        return isNaN(n) ? undefined : n;
      }
      return undefined;
    }, z.number().int().positive().default(10))
    .optional(),
});

module.exports = {
  createProductValidator,
  updateProductValidator,
  idParamValidator,
  listProductsQueryValidator,
};
