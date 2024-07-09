import connectDB from "../../lib/connectDb";
import Product from "../../../model/Product";

export async function GET(req, res) {
  await connectDB();
  const products = await Product.find({});
  console.log(products);
  return Response.json({ products });
}
