import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member"
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
