import Category from "../../../model/Category";
import connectDB from "../../lib/connectDb";

export async function GET() {
  await connectDB();
  const category = await Category.find({});

  return Response.json({ category });
}

export async function POST(request) {
  await connectDB();
  const category = await Category.create({
    name: request.json().name,
  });

  return Response.json({ category });
}
