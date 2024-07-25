import mongoose from "mongoose";
import slugify from "slugify";

const Product = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: String, required: true },
    slug: { type: String },
    images: [
      {
        url: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
Product.pre("validate", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.models.Product || mongoose.model("Product", Product);
