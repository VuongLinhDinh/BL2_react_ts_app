import { errorMessages } from "../constants/message.js";
import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "User is not logged in!"
      });
    }
    const decode = verifyToken(token);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token!"
      });
    }
    const user = await User.findById(decode._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found!"
      });
    }
    req.userId = user._id; // Gán userId vào req.userId
    next();
  } catch (error) {
    next(error);
  }
};
