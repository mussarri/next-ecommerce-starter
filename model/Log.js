import mongoose from "mongoose";

const Log = new mongoose.Schema({
  ip: { type: String, required: true },
  query: { type: String },
  success: { type: String },
  country: { type: String },
  countryCode: { type: String },
  region: { type: String },
  regionName: { type: String },
  city: { type: String },
  zip: { type: String },
  lat: { type: Number },
  lon: { type: Number },
  timezone: { type: String },
  isp: { type: String },
  org: { type: String },
  as: { type: String },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Log || mongoose.model("Log", Log);
