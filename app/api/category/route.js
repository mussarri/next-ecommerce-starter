import Category from "../../../model/Category";
import connectDB from "../../lib/connectDb";

export async function GET() {
  await connectDB();
  const category = await Category.find({});

  return Response.json({ category });
}
