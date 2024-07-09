import connectDB from "@/app/lib/connectDb";
import User from "@/model/User";

export async function GET(request) {
  await connectDB();

  const users = await User.find();
  return Response.json({ users });
}
