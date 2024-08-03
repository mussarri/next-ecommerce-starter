import { NextResponse } from "next/server";
import { isAuthenticatedUser } from "../../../middlewares/auth";
import connectDB from "../../lib/connectDb";
import stripe from "../../lib/stripe";

export async function POST(req) {
  await connectDB();

  const authResponse = await isAuthenticatedUser(req);

  if (authResponse) {
    return authResponse;
  }

  const data = await req.json();

  const shippingInfo = data?.shippingInfo;

  const line_items = data?.items?.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.image.url],
          metadata: { productId: item.product },
        },
        unit_amount: Math.ceil(item.price * 100),
      },

      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    success_url: `${process.env.DOMAIN}/profile/orders?success=true`,
    cancel_url: `${process.env.DOMAIN}`,
    customer_email: req?.user?.email,
    client_reference_id: req?.user?._id,
    metadata: { shippingInfo },
    shipping_options: [
      {
        shipping_rate: "shr_1PiaeNGZrqp2CxIHPRodJJhV",
      },
    ],
  });

  if (!session) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }

  return NextResponse.json({ url: session.url }, { status: 200 });
}
