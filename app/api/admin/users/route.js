import { NextResponse } from "next/server";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../../../../middlewares/auth";
import User from "../../../../model/User";
import connectDB from "../../../lib/connectDb";

export async function GET(req) {
  await connectDB();
  const query = {};

  const authResponse = await isAuthenticatedUser(req);

  if (authResponse) {
    return authResponse;
  }

  // if (req.user.role !== "admin") {
  //   return NextResponse.json(
  //     {
  //       message: `Role (${req.user.role}) is not allowed to access this resource.`,
  //     },
  //     { status: 401 }
  //   );
  // }

  function getQuery(field) {
    return req.nextUrl.searchParams.get(field);
  }

  if (getQuery("id")) {
    const user = await User.findById(getQuery("id")).populate(
      "shippingInfo user"
    );
    return Response.json({ user });
  }

  const resPerPage = 6;

  const page = getQuery("page") || 1;

  const usersCount = await User.countDocuments(query);

  const users = await User.find(query)
    .skip((page - 1) * resPerPage)
    .limit(resPerPage);

  return Response.json({ users, resPerPage, usersCount });
}

export async function DELETE(req) {
  await connectDB();

  const authResponse = await isAuthenticatedUser(req);

  if (authResponse) {
    return authResponse;
  }

  if (req.user.role !== "admin") {
    return NextResponse.json(
      {
        message: `Role (${req.user.role}) is not allowed to access this resource.`,
      },
      { status: 401 }
    );
  }

  function getQuery(field) {
    return req.nextUrl.searchParams.get(field);
  }

  if (getQuery("id")) {
    await User.findByIdAndDelete(getQuery("id"));
    return Response.json({
      success: true,
    });
  }

  return NextResponse.json({ error: "User is not found" }, { status: 500 });
}

export async function PUT(req) {
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

  function getQuery(field) {
    return req.nextUrl.searchParams.get(field);
  }

  if (getQuery("id")) {
    const order = await Order.findByIdAndUpdate(getQuery("id"), {
      orderStatus: data.orderStatus,
    });
    return Response.json({
      success: true,
      order,
    });
  }

  return NextResponse.json({ error: "Order is not found" });
}
