import React from "react";
import { headers } from "next/headers";
import Users from "../../components/admin/users";
import { buildQueryString } from "../../../utils/queryString";

const getUsers = async (searchParams) => {
  const headersList = headers();
  const cookie = headersList.get("cookie");

  const res = await fetch(
    `${process.env.API_URL}/api/admin/users?` + buildQueryString(searchParams),
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

const Page = async ({ searchParams }) => {
  const data = await getUsers(searchParams);

  return <Users data={data} />;
};

export default Page;
