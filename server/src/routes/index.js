import { Router } from "express";
import routerProduct from "./product.js";
import routerAuth from "./auth.js";
import routerCategory from "./category.js";
import routerUser from "./user.js";
import cartRouter from "./cart.js";
import routerFavorite from "./favorite.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import orderRouter from "./order.js";

const router = Router();

router.use("/products", routerProduct);
router.use("/auth", routerAuth);
router.use("/categories", routerCategory);
router.use("/users", routerUser);
router.use("/cart", checkAuth, cartRouter);
router.use("/orders", checkAuth, orderRouter);
router.use("/favorites", checkAuth, routerFavorite);

export default router;
