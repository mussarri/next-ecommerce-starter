import connectDB from "../../../lib/connectDb";
import Category from "../../../../model/Category";

export async function POST(request, route) {
  await connectDB();
  const { name } = request.body;
  const category = await Category.create({
    name,
  });

  return Response.json({ category });
}
