import { Router} from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./products";

const productRouter = Router();
productRouter.get("/", listProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
