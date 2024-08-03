import React from "react";

import { headers } from "next/headers";
import UpdateOrder from "../../../components/admin/updateOrders";

const getOrder = async (id) => {
  const headersList = headers();
  const cookie = headersList.get("cookie");

  const res = await fetch(`${process.env.API_URL}/api/admin/orders?id=` + id, {
    method: "GET",
    cache: "no-store",
    headers: {
      Cookie: cookie,
    },
  });

  return res.json();
};

const AdminOrderPage = async ({ params }) => {
  const data = await getOrder(params?.id);

  return <UpdateOrder order={data?.order} />;
};

export default AdminOrderPage;
