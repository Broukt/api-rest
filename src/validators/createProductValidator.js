const z = require("zod");

export const createProductValidator = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be at most 50 characters" }),
  sku: z
    .string()
    .min(1, { message: "SKU is required" })
    .max(30, { message: "SKU must be at most 30 characters" }),
  price: z
    .number("Price must be a number")
    .int("Price must be an integer")
    .positive({ message: "Price must be a positive number" }),
  stock: z
    .number("Stock must be a number")
    .int("Stock must be an integer")
    .nonnegative({ message: "Stock must be a non-negative integer" }),
  isActive: z
    .boolean()
    .optional()
    .default(true)
    .refine((val) => typeof val === "boolean", {
      message: "isActive must be a boolean",
    }),
});
