import React from "react";
import { headers } from "next/headers";

import UpdateUsers from "../../../components/admin/updateUsers";

const getUser = async (id) => {
  const headersList = headers();
  const cookie = headersList.get("cookie");

  const res = await fetch(`${process.env.API_URL}/api/admin/users?id=` + id, {
    method: "GET",
    cache: "no-store",
    headers: {
      Cookie: cookie,
    },
  });

  return res.json();
};

const Page = async ({ params }) => {
  const data = await getUser(params.id);
  return <UpdateUsers data={data} />;
};

export default Page;
