import { errorMessages, successMessages } from "../constants/message.js";
// import Category from "../models/Category.js";
// import Product from "../models/Product.js";
import Category from "../models/Category.js";
import slugify from "slugify";
import Product from "../models/Product.js";

export const createCategory = async (req, res, next) => {
  try {
    const slug = slugify(req.body.name, {
      lower: true, // Chuyển slug thành chữ thường
      strict: true // Loại bỏ các ký tự đặc biệt
    });

    console.log(slug);

    const data = await Category.create({ ...req.body, slug });
    if (!data) {
      return res.status(400).json({
        message: errorMessages.CREATE_FAIL || "Tao moi danh muc that bai!"
      });
    }
    return res.status(201).json({
      message: successMessages.CREATE_SUCCESS || "Tao moi danh muc thanh cong!",
      data
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const data = await Category.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedAt: Date.now()
      },
      {
        new: true
      }
    );
    if (!data) {
      return res.status(400).json({
        message: errorMessages?.UPDATE_FAIL || "Cap nhat danh muc that bai!"
      });
    }
    return res.status(200).json({
      message:
        successMessages?.UPDATE_SUCCESS || "Cap nhat danh muc thanh cong!",
      data
    });
  } catch (error) {
    next(error);
  }
};

export const softDeleteCategory = async (req, res, next) => {
  try {
    const data = await Category.findByIdAndUpdate(
      req.params.id,
      { isHidden: true },
      { new: true }
    );
    if (!data) {
      return res.status(400).json({
        message: errorMessages?.DELETE_FAIL || "An danh muc that bai!"
      });
    }
    return res.status(200).json({
      message: successMessages?.DELETE_SUCCESS || "An danh muc thanh cong!",
      data
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const data = await Category.find();
    if (!data || data.length === 0) {
      return res.status(400).json({
        message: errorMessages?.GET_FAIL || "Lay danh sach danh muc that bai!"
      });
    }
    return res.status(200).json({
      message: successMessages?.GET_SUCCESS || "Lay danh sach thanh cong!",
      data
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const data = await Category.findById(req.params.id).populate("products");
    if (!data) {
      return res.status(400).json({
        message: errorMessages?.GET_FAIL || "Lay danh muc that bai!"
      });
    }
    return res.status(200).json({
      message: successMessages?.GET_SUCCESS || "Lay danh muc thanh cong!",
      data
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryBySlug = async (req, res, next) => {
  try {
    const data = await Category.findOne({ slug: req.params.slug }).populate(
      "products"
    );
    if (!data) {
      return res.status(400).json({
        message: errorMessages?.GET_FAIL || "Lay danh muc that bai!"
      });
    }
    return res.status(200).json({
      message: successMessages?.GET_SUCCESS || "Lay danh muc thanh cong!",
      data
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    // Kiểm tra xem danh mục cần xoá có phải là danh mục mặc định không
    if (req.params.id === "66a9c5eda9305e426abf7406") {
      return res.status(400).json({
        message: "Không thể xoá danh mục mặc định!"
      });
    }

    // Lấy danh sách sản phẩm thuộc danh mục cần xoá
    const productsToUpdate = await Product.find({ category: req.params.id });

    // Chuyển các sản phẩm thuộc danh mục cần xoá về danh mục mặc định
    await Promise.all(
      productsToUpdate.map(async (product) => {
        product.category = "66a9c5eda9305e426abf7406"; // ID của danh mục mặc định
        await product.save();
      })
    );

    const data = await Category.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(400).json({
        message: errorMessages?.DELETE_FAIL || "Xoa danh muc that bai!"
      });
    }
    return res.status(200).json({
      message: successMessages?.DELETE_SUCCESS || "Xoa danh muc thanh cong!",
      data
    });
  } catch (error) {
    next(error);
  }
};
