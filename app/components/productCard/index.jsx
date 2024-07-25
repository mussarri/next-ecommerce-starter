"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import slugify from "slugify";
import CartContext from "../../../context/CartContext";

const ProductCard = ({
  title,
  description,
  price,
  images,
  stock,
  category,
  text,
  _id,
}) => {
  const { cart, addItemToCart, deleteItemFromCart } = useContext(CartContext);
  const handleClick = () => {
    addItemToCart({
      product: _id,
      title,
      price,
      image: images[0],
      stock,
    });
  };
  return (
    <div className="productcard rounded overflow-hidden">
      <div
        className="bg-silver rounded flex justify-center flex-col relative overflow-hidden relative"
        style={{ aspectRatio: 6 / 7 }}
      >
        {images.length > 0 && (
          <Link
            href={"/product/" + slugify(title, { lower: true, strict: true })}
          >
            <Image
              src={images[0].url}
              alt=""
              fill
              style={{ objectFit: "contain" }}
              loading="lazy"
              className="w-full  "
            />
          </Link>
        )}
        <div
          className=" absolute bottom-2 flex justify-center w-full transition-all"
          style={{ zIndex: 10 }}
        >
          <button
            className="card-btn text-white bg-button hover:bg-buttonhover p-2 px-4 rounded flex"
            onClick={handleClick}
          >
            Add to Cart
            <i className="fa-solid fa-cart"></i>
          </button>
        </div>
      </div>
      <Link
        href={"/product/" + slugify(title, { lower: true, strict: true })}
        className="flex justify-between mt-3 text-lg"
      >
        <p
          className={
            "font-semibold uppercase " + (text === "sm" ? " text-sm" : "")
          }
        >
          {title}
        </p>
        <p className="font-bold text-buttonhover ">{price + "$"}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
