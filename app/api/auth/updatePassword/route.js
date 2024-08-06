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
    const user = await User.findById(getQuery("id")).select("+password");

    const isPasswordMatched = await bcrypt.compare(
      data.oldPassword,
      user.password
    );

    if (!isPasswordMatched) {
      return NextResponse.json(
        { message: "Password is incorrect" },
        { status: 400 }
      );
    }

    user.password = data.password;
    await user.save();

    return NextResponse.json({ user });
  }

  return NextResponse.json({ message: "User is not found" }, { status: 400 });
}
