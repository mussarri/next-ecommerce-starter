import React from "react";
import AddProductComponent from "../../../components/admin/addProduct";
import UpdateProduct from "../../../components/admin/updateProduct";
import { headers } from "next/headers";
import { buildQueryString } from "../../../../utils/queryString";

const getProduct = async (id) => {
  const headersList = headers();
  const cookie = headersList.get("cookie");

  const res = await fetch(
    `${process.env.API_URL}/api/admin/products?id=` + id,
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

const getCategories = async () => {
  const res = await fetch(`${process.env.API_URL}/api/category`, {
    method: "GET",
    cache: "no-store",
  });

  return res.json();
};

const UpdataProduct = async ({ params }) => {
  const data = await getProduct(params.id);
  const categories = await getCategories();

  return <UpdateProduct data={data.product} categories={categories.category} />;
};

export default UpdataProduct;
