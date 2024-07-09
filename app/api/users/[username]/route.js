import Category from "../../../../model/Category";
import connectDB from "../../../lib/connectDb";

export async function GET(request, route) {
  await connectDB();
  const { username } = request.nextUrl.searchParams.get("username");
  const user = await Category.find({ username });

  return Response.json({ user });
}

export async function DELETE(request, route) {
  await connectDB();
  const { username } = request.nextUrl.searchParams.get("username");
  const user = await Category.deleteOne({ username });

  return Response.json({ user });
}

export async function PUT(request, route) {
  await connectDB();
  const { username } = request.nextUrl.searchParams.get("username");
  const { name, lastname, email, address } = request.body;
  const user = await Category.deleteOne({ username });

  return Response.json({ user });
}
