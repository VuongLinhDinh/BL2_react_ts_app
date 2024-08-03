import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId; // Lấy userId từ middleware
    if (!userId) return res.status(400).json({ message: "User ID is missing" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [], totalPrice: 0 });
    }

    const findIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (findIndex === -1) {
      cart.products.push({ product: productId, quantity });
    } else {
      cart.products[findIndex].quantity += quantity;
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
    const userId = req.userId; // Lấy userId từ middleware
    const { productId } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID is missing" });

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const findIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (findIndex === -1)
      return res.status(404).json({ message: "Product not found in cart" });

    const product = cart.products[findIndex];
    cart.totalPrice -=
      product.quantity * (await Product.findById(product.product)).price;
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
    const userId = req.userId; // Lấy userId từ middleware
    if (!userId) return res.status(400).json({ message: "User ID is missing" });

    const cart = await Cart.findOne({ userId }).populate("products.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

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
    const userId = req.userId; // Lấy userId từ middleware checkAuth

    const cart = await Cart.findOne({ userId }).populate("products.product");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cart.products.map((item) => ({
      product: {
        _id: item.product._id,
        title: item.product.name,
        price: item.product.price,
        thumbnail: item.product.images, // Assuming 'images' is a URL string
        description: item.product.description
      },
      quantity: item.quantity
    }));

    const order = new Order({
      userId: userId,
      products: orderItems,
      totalPrice: cart.totalPrice,
      status: "pending" // Trạng thái mặc định là 'pending'
    });

    await order.save();

    // Xóa giỏ hàng sau khi thanh toán
    cart.products = [];
    cart.totalPrice = 0;
    await cart.save();

    return res.status(200).json({ message: "Checkout successfully", order });
  } catch (error) {
    next(error);
  }
};
export const increaseQuantity = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userId = req.userId; // Lấy userId từ middleware

    if (!userId) return res.status(400).json({ message: "User ID is missing" });

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const findIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (findIndex === -1)
      return res.status(404).json({ message: "Product not found in cart" });

    // Tăng số lượng
    cart.products[findIndex].quantity += 1;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    cart.totalPrice += product.price;
    await cart.save();

    return res.status(200).json({
      message: "Product quantity increased successfully",
      cart
    });
  } catch (error) {
    next(error);
  }
};

export const decreaseQuantity = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userId = req.userId;
    if (!userId) return res.status(400).json({ message: "User ID is missing" });

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const findIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (findIndex === -1)
      return res.status(404).json({ message: "Product not found in cart" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (cart.products[findIndex].quantity > 1) {
      // Giảm số lượng nếu nhiều hơn 1
      cart.products[findIndex].quantity -= 1;
      cart.totalPrice -= product.price;
    } else {
      // Nếu số lượng chỉ còn 1, xóa sản phẩm khỏi giỏ hàng
      cart.products = cart.products.filter(
        (p) => p.product.toString() !== productId
      );
      cart.totalPrice -= product.price;
    }

    await cart.save();

    return res.status(200).json({
      message: "Decreased product quantity successfully",
      cart
    });
  } catch (error) {
    next(error);
  }
};
export const getOrderHistory = async (req, res, next) => {
  try {
    const userId = req.userId; // Lấy userId từ middleware checkAuth

    if (!userId) return res.status(400).json({ message: "User ID is missing" });

    // Tìm các đơn hàng của người dùng
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }); // Sắp xếp theo ngày tạo mới nhất

    if (!orders.length)
      return res.status(404).json({ message: "No orders found" });

    return res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};
