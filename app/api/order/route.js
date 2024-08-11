import { NextResponse } from "next/server";
import connectDB from "../../lib/connectDb";
import Order from "../../../model/Order";
import { isAuthenticatedUser } from "../../../middlewares/auth";

export async function GET(request) {
  await connectDB();
  const authResponse = await isAuthenticatedUser(request);
  if (authResponse) {
    return authResponse;
  }
  const query = { user: request.user?._id };

  const resPerPage = 2;

  function getQuery(field) {
    return request.nextUrl.searchParams.get(field);
  }

  const page = getQuery("page") || 1;

  const count = await Order.countDocuments(query);

  const orders = await Order.find(query)
    .sort({ createAt: -1 })
    .skip((page - 1) * resPerPage)
    .limit(resPerPage)
    .populate("shippingInfo user");

  return NextResponse.json({ orders, count });
}
