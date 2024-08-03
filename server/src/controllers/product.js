import { errorMessages, successMessages } from "../constants/message.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getAllProduct = async (req, res, next) => {
  try {
    const data = await Product.find({}).populate("category");
    if (!data || data.length === 0) {
      return res.status(400).json({
        message: "Khong tim thay san pham nao!"
      });
    }

    return res.status(200).json({
      message: "Lay san pham thanh cong!",
      data
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Product.findById(id).populate("category");
    if (!data) {
      return res.status(400).json({
        message:
          errorMessages?.PRODUCT_NOT_FOUND || "Khong tim thay san pham nao!"
      });
    }

    return res.status(200).json({
      message:
        successMessages?.GET_PRODUCT_SUCCESS || "Lay san pham thanh cong!",
      data
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Product.findByIdAndDelete(id);
    if (!data) {
      return res.status(400).json({
        message: "Xoa that bai!"
      });
    }

    return res.status(200).json({
      message: "Xoa thanh cong!",
      data
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const data = await Product.create(req.body);
    let updateCategory = null;
    if (!!data.category) {
      updateCategory = await Category.findByIdAndUpdate(
        data.category,
        {
          $push: { products: data._id }
        },
        { new: true }
      );
    } else {
      updateCategory = await Category.findByIdAndUpdate(
        "66a85a3900516fd35af14fcd",
        {
          $push: { products: data._id }
        },
        { new: true }
      );

      // Nếu không có category thì sẽ thêm vào category mặc định
    }

    if (data && updateCategory) {
      return res.status(200).json({
        message: "Tao moi thanh cong!",
        data
      });
    }
    return res.status(400).json({
      message: "Tao moi that bai!"
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      {
        new: true
      }
    );
    if (!data) {
      return res.status(400).json({ message: errorMessages?.UPDATE_FAIL });
    }

    return res.status(200).json({
      message: successMessages?.UPDATE_SUCCESS || "Cap nhat thanh cong!",
      data
    });
  } catch (error) {
    next(error);
  }
};

// Add a product to favorites
export const addFavorite = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.userId; // Assuming you have user authentication

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.favorites.includes(userId)) {
      return res.status(400).json({ message: "Product already in favorites" });
    }

    product.favorites.push(userId);
    await product.save();

    const user = await User.findById(userId);
    user.favorites.push(productId);
    await user.save();

    return res.status(200).json({
      message: "Added to favorites successfully!",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Remove a product from favorites
export const removeFavorite = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.userId; // Assuming you have user authentication

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.favorites = product.favorites.filter(
      (favorite) => !favorite.equals(userId)
    );
    await product.save();

    const user = await User.findById(userId);
    user.favorites = user.favorites.filter(
      (favorite) => !favorite.equals(productId)
    );
    await user.save();

    return res.status(200).json({
      message: "Removed from favorites successfully!",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Get favorite products for a user
export const getFavorites = async (req, res, next) => {
  try {
    const userId = req.userId; // Assuming you have user authentication
    const products = await Product.find({ favorites: userId }).populate(
      "category"
    );

    return res.status(200).json({
      message: "Favorite products retrieved successfully!",
      data: products
    });
  } catch (error) {
    next(error);
  }
};
