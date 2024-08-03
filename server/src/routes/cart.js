import { Router } from "express";
import {
  addToCart,
  checkout,
  getCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  getOrderHistory
} from "../controllers/cart.js";

const cartRouter = Router();

cartRouter.post("/", addToCart);
cartRouter.get("/", getCart);
cartRouter.post("/remove", removeFromCart);
cartRouter.post("/checkout", checkout);
cartRouter.post("/history", getOrderHistory);
cartRouter.post("/increase", increaseQuantity); // Route tăng số lượng
cartRouter.post("/decrease", decreaseQuantity); // Route giảm số lượng

export default cartRouter;
