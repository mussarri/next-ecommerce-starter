import connectDB from "../../lib/connectDb";
import Product from "../../../model/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();
  const query = {};

  function getQuery(field) {
    return request.nextUrl.searchParams.get(field);
  }

  const page = request.nextUrl.searchParams.get("page") || 1;
  if (getQuery("category")) query.category = getQuery("category");
  if (getQuery("min")) query.price = { ...query.price, $gte: getQuery("min") };
  if (getQuery("max")) query.price = { ...query.price, $lte: getQuery("max") };

  const products = await Product.find(query)
    .skip((page - 1) * 6)
    .limit(6);

  return Response.json({ products });
}

export async function POST(request) {
  await connectDB();
  const data = request.json();
  const product = await Product.create(data);

  return NextResponse.json({ product });
}
