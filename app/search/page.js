import React from "react";

const getData = async (search) => {
  const res = await fetch(process.env.API_URL + "/api/products?q=" + search, {
    cache: "no-store",
  });
  return res.json();
};

const Page = async ({ searchParams }) => {
  const data = await getData(searchParams.q);
  console.log(data);

  return <div>Page</div>;
};

export default Page;
