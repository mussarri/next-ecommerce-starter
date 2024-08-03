import React from "react";
import AddProductComponent from "../../components/admin/addProduct";

const getCategories = async () => {
  const res = await fetch(`${process.env.API_URL}/api/category`, {
    method: "GET",
    cache: "no-store",
  });

  return res.json();
};

const AddProduct = async () => {
  const data = await getCategories();
  return <AddProductComponent categories={data?.category} />;
};

export default AddProduct;
