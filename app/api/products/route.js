import connectDB from "../../lib/connectDb";
import Product from "../../../model/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();
  const query = {};
  const resPerPage = 6;
  const page = request.nextUrl.searchParams.get("page") || 1;
  function getQuery(field) {
    return request.nextUrl.searchParams.get(field);
  }

  if (getQuery("all")) {
    const products = await Product.find();

    return NextResponse.json({ products });
  }

  if (getQuery("category")) query.category = getQuery("category");
  if (getQuery("q")) query.title = new RegExp(getQuery("q"), "i");
  if (getQuery("min")) query.price = { ...query.price, $gte: getQuery("min") };
  if (getQuery("max")) query.price = { ...query.price, $lte: getQuery("max") };

  const productsCount = await Product.countDocuments(query);

  const products = await Product.find(query)
    .skip((page - 1) * resPerPage)
    .limit(resPerPage);

  return NextResponse.json({ products, resPerPage, productsCount });
}
