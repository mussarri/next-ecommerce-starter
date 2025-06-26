import { NextResponse } from "next/server";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../../../../middlewares/auth";
import Log from "../../../../model/Log";
import connectDB from "../../../lib/connectDb";

export async function GET(req) {
  await connectDB();
  const query = {};

  const authResponse = await isAuthenticatedUser(req);

  function getQuery(field) {
    return req.nextUrl.searchParams.get(field);
  }

  if (authResponse) {
    return authResponse;
  }

  if (req.user.role !== "admin") {
    console.log("not validate");
    return NextResponse.json(
      {
        message: `Role (${req.user.role}) is not allowed to access this resource.`,
      },
      { status: 401 }
    );
  }

  if (getQuery("id")) {
    const log = await Log.findById(getQuery("id")).sort({ createAt: -1 });
    return Response.json({ log });
  }

  const resPerPage = 6;

  const page = getQuery("page") || 1;

  const logsCount = await Log.countDocuments(query);

  const logs = await Log.find(query)
    .sort({ createAt: -1 })
    .skip((page - 1) * resPerPage)
    .limit(resPerPage);

  return Response.json({ logs, resPerPage, logsCount });
}
