import { Schema, model } from "mongoose";

const cartItem = new Schema({
	product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
	quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
	products: [cartItem],
	totalPrice: { type: Number, required: true },
});

export default model("Cart", cartSchema);
