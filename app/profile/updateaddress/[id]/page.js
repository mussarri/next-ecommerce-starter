import React from "react";
import UpdateAddress from "../../../components/updateAddress";
import { headers } from "next/headers";

const getAddresses = async (id) => {
  const headersList = headers();
  const cookie = headersList.get("cookie");
  const res = await fetch(`${process.env.API_URL}/api/address/` + id, {
    method: "GET",
    cache: "no-store",
    headers: {
      Cookie: cookie,
    },
  });

  return res.json();
};

const Page = async ({ params }) => {
  const id = params.id;
  const data = await getAddresses(id);
  

  return <UpdateAddress address={data?.address} />;
};

export default Page;
