import { StatusCodes } from "http-status-codes";
import Category from "../models/CategoryModel";
import ApiError from "../utils/ApiError";

class CategoriesController {
  // GET /categories
  async getAllCategories(req, res, next) {
    try {
      const categories = await Category.find();
      res.status(StatusCodes.OK).json(categories);
    } catch (error) {
      next(error);
    }
  }

  // GET /categories/:id
  async getCategoryDetail(req, res, next) {
    try {
      const category = await Category.findById(req.params.id);

      if (!category) throw new ApiError(404, "Category Not Found");
      res.status(StatusCodes.OK).json(category);
    } catch (error) {
      next(error);
    }
  }

  // POST /categories
  async createCategory(req, res, next) {
    try {
      const newCategory = await Category.create(req.body);
      res.status(StatusCodes.CREATED).json({
        message: "Create Category Successfull",
        data: newCategory
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /categories/:id
  async updateCategory(req, res, next) {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // This option returns the updated document
      );
      if (!category) throw new ApiError(404, "Category Not Found");
      res.status(StatusCodes.OK).json({
        message: "Update Category Successfull",
        data: category
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /categories/:id
  async deleteCategory(req, res, next) {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) throw new ApiError(404, "Category Not Found");
      res.status(StatusCodes.OK).json({
        message: "Delete Category Done"
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CategoriesController;
