import { NextResponse } from "next/server";
import User from "../../../../model/User";
import connectDB from "../../../lib/connectDb";

export async function POST(request) {
  await connectDB();
  const data = await request.json();

  const user = await User.create(data);

  return NextResponse.json({ user });
}
