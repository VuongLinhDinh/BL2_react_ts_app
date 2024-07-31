import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        // category: "uknown",
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
});

export default model("Order", orderSchema);
