import connectDB from "../../../lib/connectDb";
import Product from "../../../../model/Product";

export async function POST(request, route) {
  await connectDB();
  const { title, description, price } = request.body;
  const product = await Product.create({ title, description, price });

  return Response.json({ product });
}

