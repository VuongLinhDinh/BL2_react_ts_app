import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    images: {
      type: String,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 4.5
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category"
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
