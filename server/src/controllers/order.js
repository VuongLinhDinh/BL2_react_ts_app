// controllers/orderController.js
import Order from "../models/Order.js";

export const getOrderHistory = async (req, res, next) => {
  try {
    const userId = req.userId; // Lấy userId từ middleware checkAuth
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};
