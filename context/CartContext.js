"use client";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : {}
    );
  };

  useEffect(() => {
    setCartToState();
  }, []);

  const addItemToCart = async ({
    product,
    title,
    price,
    image,
    stock,
    quantity = 1,
  }) => {
    const item = { product, title, price, image, stock, quantity };

    const isItemExist = cart?.cartItems?.find(
      (i) => i.product === item.product
    );
    let newCartItems;

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.product === isItemExist?.product ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const saveOnCheckout = ({ amount, tax, totalAmount }) => {
    const checkoutInfo = {
      amount,
      tax,
      totalAmount,
    };

    const newCart = { ...cart, checkoutInfo };

    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartToState();
    router.push("/shipping");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addItemToCart,
        deleteItemFromCart,
        saveOnCheckout,
      }}
    >
      {" "}
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
