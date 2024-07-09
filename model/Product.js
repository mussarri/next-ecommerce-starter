import mongoose from "mongoose";

const Product = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model("Product", Product);