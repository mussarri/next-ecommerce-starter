import React from "react";
import Profile from "../components/profile";
import { headers } from "next/headers";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

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

const Page = async () => {
  const data = await getAddresses();
 
  return <Profile address={data?.address} />;
};

export default Page;
