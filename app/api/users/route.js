import connectDB from "../../lib/connectDb";

export async function GET(request, route) {
  await connectDB();

  return Response.json({ users });
}
