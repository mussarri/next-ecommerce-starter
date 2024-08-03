// middleware/isAuthenticatedUser.js
import { getServerSession, getSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../app/lib/auth";

export async function isAuthenticatedUser(req, res) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  req.user = session.user;

  return null;
}

export function authorizeRoles(req, roles) {
  if (!roles.includes(req.user.role)) {
    return NextResponse.json(
      {
        message: `Role (${req.user.role}) is not allowed to access this resource.`,
      },
      { status: 401 }
    );
  }

  return null;
}
