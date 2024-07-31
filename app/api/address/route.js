import connectDB from "../../lib/connectDb";
import Address from "../../../model/Address";
import { NextResponse } from "next/server";
import { isAuthenticatedUser } from "../../../middlewares/auth";

export async function POST(req) {
  await connectDB();
  const authResponse = await isAuthenticatedUser(req);
  if (authResponse) {
    return authResponse;
  }
  const data = await req.json();
  data.user = req.user._id;

  const address = await Address.create(data);

  return NextResponse.json({ address });
}

export async function GET(req, res) {
  await connectDB();

  const authResponse = await isAuthenticatedUser(req, res);

  if (authResponse) {
    return authResponse;
  }

  const address = await Address.find({ user: req.user._id });

  return NextResponse.json({ address });
}
