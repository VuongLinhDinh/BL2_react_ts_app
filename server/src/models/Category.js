import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
		},
		slug: {
			type: String,
		},
		products: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
		isHidden: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true, versionKey: false }
);

export default mongoose.model("Category", categorySchema);
