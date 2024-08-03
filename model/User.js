import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  surname: { type: String },
  role: {
    type: String,
    default: "user",
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: [6, "Your password must be longer than 6 characters"],
  },
  email: { type: String, required: true, unique: true },
});

User.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.models.User || mongoose.model("User", User);
