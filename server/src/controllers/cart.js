import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    console.log(req.userId);
    let cart = await Cart.findOne({ userId: req.userId });

    // Nếu chưa có giỏ hàng nào của user này, tạo mới giỏ hàng
    if (!cart)
      cart = new Cart({ userId: req.userId, products: [], totalPrice: 0 });

    const findIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (findIndex === -1) {
      // Nếu sản phẩm này chưa từng có trong giỏ hàng, cần thêm sản phẩm này cùng số lượng vào giỏ hàng,
      cart.products.push({ product: productId, quantity });
    } else {
      // Nếu sản phẩm này đã có trong giỏ hàng, cần cập nhật số lượng sản phẩm trong giỏ hàng,
      cart.products[existingProductIndex].quantity += quantity;
    }

    cart.totalPrice += product.price * quantity;
    await cart.save();
    return res.status(200).json({
      message: "Add to cart successfully",
      cart
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const findIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (findIndex === -1)
      return res.status(404).json({ message: "Product not found in cart" });
    const product = cart.products[findIndex];
    cart.totalPrice -= product.quantity * product.product.price;
    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );
    await cart.save();
    return res.status(200).json({
      message: "Remove product from cart successfully",
      cart
    });
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ userId }).populate("products.product");
    return res.json({
      message: "Get cart successfully",
      cart
    });
  } catch (error) {
    next(error);
  }
};

export const checkout = async (req, res, next) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ userId }).populate("products.product");
    if (!cart) return res.status(400).json({ message: "Cart is empty" });
    // Viết thêm logic về thanh toán tuỳ xem chuyển khoản theo phương thức nào hoặc dùng api bên thứ 3.

    const order = new Order({
      user: userId,
      products: cart.products,
      totalPrice: cart.totalPrice
    });
    await order.save();

    // Xoa gio hang sau khi thanh toan
    cart.products = [];
    cart.totalPrice = 0;
    await cart.save();
    return res.status(200).json({ message: "Checkout successfully" });
  } catch (error) {
    next(error);
  }
};
