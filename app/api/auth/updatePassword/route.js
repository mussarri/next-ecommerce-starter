import { NextResponse } from "next/server";
import User from "../../../../model/User";
import connectDB from "../../../lib/connectDb";
import { isAuthenticatedUser } from "../../../../middlewares/auth";

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
    const user = await User.findById(getQuery("id"));
    user.password = data.password;
    await user.save();

    return NextResponse.json({ user });
  }

  return NextResponse.json({ message: "User is not found" }, { status: 400 });
}
