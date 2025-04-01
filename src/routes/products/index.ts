import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./products";
import { validateData } from "../../middlewares/validationMiddleware";
import {
  createProductSchema,
  updateProductSchema,
} from "../../../database/productSchema";
import { verifySeller, verifyToken } from "../../middlewares/authMiddleware";

const productRouter = Router();
productRouter.get("/", listProducts);
productRouter.get("/:id", getProductById);
productRouter.post(
  "/",
  verifyToken,
  verifySeller,
  validateData(createProductSchema),
  createProduct
);
productRouter.put(
  "/:id",
  verifyToken,
  verifySeller,
  validateData(updateProductSchema),
  updateProduct
);
productRouter.delete("/:id", verifyToken, verifySeller, deleteProduct);

export default productRouter;
