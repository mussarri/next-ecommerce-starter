import connectDB from "../../../lib/connectDb";
import Address from "../../../../model/Address";
import { isAuthenticatedUser } from "../../../../middlewares/auth";

export async function GET(req, route) {
  await connectDB();
  const authResponse = await isAuthenticatedUser(req);

  if (authResponse) {
    return authResponse;
  }

  const id = route.params.id;

  const address = await Address.findById(id);

  return Response.json({ address });
}

export async function PUT(req, route) {
  await connectDB();
  console.log('req');
  const authResponse = await isAuthenticatedUser(req);

  if (authResponse) {
    return authResponse;
  }
  const id = route.params.id;
  const data = await req.json();
  console.log(data);
  const address = await Address.findByIdAndUpdate(id, data);
  return Response.json({ address });
}

export async function DELETE(req, route) {
  await connectDB();
  const authResponse = await isAuthenticatedUser(req);

  if (authResponse) {
    return authResponse;
  }

  const id = route.params.id;
  const address = await Address.findByIdAndDelete(id);

  return Response.json({ address });
}
