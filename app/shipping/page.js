import React from "react";
import Shipping from "../components/shipping";
import { headers } from "next/headers";

const getAddresses = async () => {
  const headersList = headers();
  const cookie = headersList.get("cookie");
  const res = await fetch(`${process.env.API_URL}/api/address`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Cookie: cookie,
    },
  });

  return res.json();
};

const ShippingPage = async () => {
  const data = await getAddresses();

  return <Shipping addresses={data.address} />;
};

export default ShippingPage;
