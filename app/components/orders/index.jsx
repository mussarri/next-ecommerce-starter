"use client";

import React, { useContext, useEffect } from "react";

import { useSearchParams, useRouter } from "next/navigation";
import OrderItem from "./orderItem";
import CartContext from "../../../context/CartContext";
import Pagination from "../pagination";

const ListOrders = ({ orders, count }) => {
  const { clearCart } = useContext(CartContext);
  const params = useSearchParams();
  const router = useRouter();

  const orderSuccess = params.get("success");

  useEffect(() => {
    if (orderSuccess === "true") {
      clearCart();
      router.replace("/profile/orders");
    }
  }, []);

  return (
    <>
      <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
      {orders?.orders?.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}

      <Pagination
        resPerPage={orders?.resPerPage}
        productsCount={orders?.count}
      />
    </>
  );
};

export default ListOrders;
