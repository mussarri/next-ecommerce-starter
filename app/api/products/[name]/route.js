import connectDB from "../../../lib/connectDb";
import Product from "../../../../model/Product";

export async function GET(request, route) {
  await connectDB();
  const name = route.params.name;
  const product = await Product.findOne({ title: name });

  return Response.json({ product });
}

export async function PUT(request, route) {
  await connectDB();
  const name = route.params.name;
  const { title, description, price } = request.body;
  const product = await Product.findOneAndUpdate(
    { title: name },
    {
      title,
      description,
      price,
    }
  );
  return Response.json({ product });
}

export async function DELETE(request, route) {
  await connectDB();

  const name = route.params.name;
  const product = await Product.findOneAndDelete({ title: name });

  return Response.json({ product });
}
