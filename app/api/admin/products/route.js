import { NextResponse } from "next/server";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../../../../middlewares/auth";
import Product from "../../../../model/Product";
import connectDB from "../../../lib/connectDb";
import { getQuery } from "../../../../utils/queryString";

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const authResponse = await isAuthenticatedUser(req);

  if (authResponse) {
    return authResponse;
  }

  // const isAuthorized = authorizeRoles(req, ["admin"]);

  // if (isAuthorized) {
  //   return isAuthorized;
  // }

  data.user = req.user._id;

  const product = await Product.create(data);

  return NextResponse.json({ product });
}

export async function GET(request) {
  await connectDB();
  const query = {};

  function getQuery(field) {
    return request.nextUrl.searchParams.get(field);
  }

  if (getQuery("id")) {
    const product = await Product.findById(getQuery("id"));
    return Response.json({ product });
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

export async function DELETE(req) {
  await connectDB();

  const authResponse = await isAuthenticatedUser(req);

  if (authResponse) {
    return authResponse;
  }

  function getQuery(field) {
    return req.nextUrl.searchParams.get(field);
  }

  if (getQuery("id")) {
    const product = await Product.findByIdAndDelete(getQuery("id"));
    return Response.json({ product });
  }

  return NextResponse.json({ error: "Product not found" }, { status: 500 });
}

export async function PUT(req) {
  await connectDB();
  const data = await req.json();
  const authResponse = await isAuthenticatedUser(req);

  if (authResponse) {
    return authResponse;
  }

  function getQuery(field) {
    return req.nextUrl.searchParams.get(field);
  }

  if (getQuery("id")) {
    const product = await Product.findByIdAndUpdate(getQuery("id"), data);
    return Response.json({ product });
  }

  return NextResponse.json({ error: "Product not found" });
}
