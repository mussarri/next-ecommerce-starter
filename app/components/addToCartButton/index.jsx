"use client";
import React from "react";
import { useContext } from "react";
import CartContext from "../../../context/CartContext";
const AddToCart = ({ product }) => {
  const { cart, addItemToCart } = useContext(CartContext);
  const handleClick = () => {
    addItemToCart({
      product: product,
      title: product.title,
      price: product.price,
      image: product.images[0],
      stock: product.stock,
    });
  };
  console.log(cart);
  return (
    <div className="py-3">
      <button
        className="bg-buttonhover text-white rounded p-3 px-5 hover:opacity-80"
        onClick={handleClick}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;
