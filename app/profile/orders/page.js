import React from "react";
import { headers } from "next/headers";
import ListOrders from "../../components/orders";

const getOrders = async (searchParams) => {
  const headersList = headers();
  const cookie = headersList.get("cookie");

  const res = await fetch(`${process.env.API_URL}/api/order?`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Cookie: cookie,
    },
  });

  return res.json();
};

const Orders = async ({ searchParams }) => {
  const data = await getOrders(searchParams);

  return <ListOrders orders={data} />;
};

export default Orders;
