import React from "react";
import { headers } from "next/headers";
import AdminProducts from "../../components/admin/products";
import { buildQueryString } from "../../../utils/queryString";

const getProducts = async (searchParams) => {
  const headersList = headers();
  const cookie = headersList.get("cookie");

  const res = await fetch(
    `${process.env.API_URL}/api/admin/products?` +
      buildQueryString(searchParams),
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

const Products = async ({ searchParams }) => {
  const data = await getProducts(searchParams);

  return <AdminProducts data={data} />;
};

export default Products;
