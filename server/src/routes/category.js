import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  softDeleteCategory,
  updateCategory
} from "../controllers/category.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { categorySchema } from "../validSchema/category.js";

const routerCategory = Router();
routerCategory.get("/", getCategories);
routerCategory.get("/:id", getCategoryById);

routerCategory.use(checkAuth, checkIsAdmin);
routerCategory.delete("/:id", deleteCategory);
routerCategory.patch("/:id", softDeleteCategory);

routerCategory.use(validBodyRequest(categorySchema));
routerCategory.post("/", createCategory);
routerCategory.put("/:id", updateCategory);
export default routerCategory;
