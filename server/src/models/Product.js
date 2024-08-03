import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
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
      type: String
    },
    discount: {
      type: Number,
      default: 0
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    images: { type: String },
    isShow: {
      type: Boolean,
      default: false
    },
    stock: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model("Product", productSchema);
