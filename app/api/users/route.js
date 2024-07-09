import Category from "../../../model/Category";
import connectDB from "../../lib/connectDb";

export async function GET(request, route) {
  await connectDB();
  const users = await User.find({});

  return Response.json({ users });
}
