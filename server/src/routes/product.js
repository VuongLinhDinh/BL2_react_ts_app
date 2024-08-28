import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct
} from "../controllers/product.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const routerProduct = Router();
routerProduct.get("/", getAllProduct);
routerProduct.get("/:id", getProductById);
routerProduct.delete("/:id", checkAuth, deleteProduct);
routerProduct.post("/", checkAuth, createProduct);
routerProduct.put("/:id", checkAuth, updateProduct);
export default routerProduct;
