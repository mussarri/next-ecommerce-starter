import mongoose from "mongoose";

const Category = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
});

export default mongoose.models.Category || mongoose.model("Category", Category);
