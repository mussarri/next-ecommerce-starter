"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const newProduct = async (product) => {
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/admin/products`,
        product
      );

      if (data) {
        setUpdated(true);
        router.replace("/admin/products");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const updateProduct = async (product, id) => {
    try {
      const { data } = await axios.put(
        `${process.env.API_URL}/api/admin/products?id=` + id,
        product
      );

      if (data) {
        setUpdated();
        router.replace("/admin/products");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.API_URL}/api/admin/products?id=` + id
      );

      if (data) {
        setUpdated();
        router.replace("/admin/products ");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <ProductContext.Provider
      value={{
        error,
        loading,
        updated,
        setUpdated,
        newProduct,
        updateProduct,
        deleteProduct,
        clearErrors,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
