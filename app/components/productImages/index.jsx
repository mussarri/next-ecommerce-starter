"use client";
import Image from "next/image";
import React, { useState } from "react";

const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <div className="flex-1 w-full ">
      <div
        className="relative w-full border border-silver"
        style={{ aspectRatio: 7 / 5 }}
      >
        <Image
          src={images[activeImage].url}
          alt=""
          fill
          style={{ objectFit: "contain" }}
          loading="lazy"
          className="w-full  "
        />
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 w-full mt-2">
        {images.map((item, index) => (
          <div
            className={
              "w-full relative rounded" +
              (activeImage === index ? " border" : "")
            }
            style={{ aspectRatio: 4 / 3, borderColor: "#aaa" }}
          >
            <Image
              src={item.url}
              alt=""
              fill
              style={{ objectFit: "contain" }}
              loading="lazy"
              className={"w-full  border border-silver rounded cursor-pointer"}
              onClick={() => setActiveImage(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
