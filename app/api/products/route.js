import connectDB from "../../lib/connectDb";
import Product from "../../../model/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();
  const query = {};

  function getQuery(field) {
    return request.nextUrl.searchParams.get(field);
  }

  const resPerPage = 6;

  const page = request.nextUrl.searchParams.get("page") || 1;
  if (getQuery("category")) query.category = getQuery("category");
  if (getQuery("min")) query.price = { ...query.price, $gte: getQuery("min") };
  if (getQuery("max")) query.price = { ...query.price, $lte: getQuery("max") };

  const productsCount = await Product.countDocuments(query);

  const products = await Product.find(query)
    .skip((page - 1) * resPerPage)
    .limit(resPerPage);

  return Response.json({ products, resPerPage, productsCount });
}

