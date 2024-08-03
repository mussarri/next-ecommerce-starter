"use client";
import React from "react";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { ProductProvider } from "../context/ProductContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { OrderProvider } from "../context/OrderContext";

export const GlobalProvider = ({ children }) => {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <OrderProvider>
              <SessionProvider>{children}</SessionProvider>
            </OrderProvider>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
};
