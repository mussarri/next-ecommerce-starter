import mongoose from "mongoose";

const Log = new mongoose.Schema({
  ip: { type: String, required: true },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Log || mongoose.model("Log", Log);
