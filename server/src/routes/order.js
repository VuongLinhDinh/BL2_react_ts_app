import { Router } from "express";
import { getOrderHistory } from "../controllers/order.js";

const orderRouter = Router();

orderRouter.post("/history", getOrderHistory);

export default orderRouter;
