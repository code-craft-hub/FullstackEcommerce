import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./products";
import { validateData } from "../../middlewares/validationMiddleware";
import { createProductSchema, updateProductSchema } from "../../../database/productSchema";

const productRouter = Router();
productRouter.get("/", listProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", validateData(createProductSchema), createProduct);
productRouter.put("/:id", validateData(updateProductSchema),updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
