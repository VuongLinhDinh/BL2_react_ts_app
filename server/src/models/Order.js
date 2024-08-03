import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: {
          title: { type: String, required: true },
          price: { type: Number, required: true },
          thumbnail: { type: String, required: true },
          description: { type: String }
        },
        quantity: { type: Number, required: true, min: 1 }
      }
    ],
    status: {
      type: String,
      required: true,
      enum: ["pending", "shipping", "completed", "cancel"]
    },
    totalPrice: { type: Number, required: true }
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
    versionKey: false
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
