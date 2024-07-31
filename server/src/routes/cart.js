import { Router } from "express";
import { addToCart, checkout, getCart, removeFromCart } from "../controllers/cart.js";

const cartRouter = Router();

cartRouter.post("/", addToCart);
cartRouter.get("/", getCart);
cartRouter.post("/remove", removeFromCart);
cartRouter.post("/checkout", checkout);

export default cartRouter;
