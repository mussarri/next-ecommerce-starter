import connectDB from "../../../lib/connectDb";
import Product from "../../../../model/Product";

export async function GET(request, route) {
  await connectDB();
  const name = route.params.name;
  console.log(name);

  const product = await Product.findOne({ slug: name });

  return Response.json({ product });
}

export async function PUT(request, route) {
  await connectDB();
  const name = route.params.name;
  const { title, description, price, category, stock, images } = request.body;
  const product = await Product.findOneAndUpdate(
    { slug: name },
    {
      title,
      description,
      price,
      category,
      stock,
      images,
    }
  );
  return Response.json({ product });
}

export async function DELETE(request, route) {
  await connectDB();

  const name = route.params.name;
  const product = await Product.findOneAndDelete({ slug: name });

  return Response.json({ product });
}
