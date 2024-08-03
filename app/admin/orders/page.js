import React from "react";
import { headers } from "next/headers";
import AdminProducts from "../../components/admin/products";
import { buildQueryString } from "../../../utils/queryString";
import Orders from "../../components/admin/orders";

const getOrders = async (searchParams) => {
  const headersList = headers();
  const cookie = headersList.get("cookie");

  const res = await fetch(
    `${process.env.API_URL}/api/admin/orders?` + buildQueryString(searchParams),
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Cookie: cookie,
      },
    }
  );

  return res.json();
};

const AdminOrdersPage = async ({ searchParams }) => {
  const orders = await getOrders(searchParams);

  return <Orders orders={orders} />;
};

export default AdminOrdersPage;
