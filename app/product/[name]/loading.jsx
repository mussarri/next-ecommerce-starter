import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="max-width p-5">
      {
        <div className="flex gap-5">
          <div className="flex-1 w-full">
            <div
              className="relative w-full border border-silver"
              style={{ aspectRatio: 7 / 5 }}
            >
              <Image
                src="/product-placeholder.gif"
                alt=""
                fill
                style={{ objectFit: "contain" }}
                loading="lazy"
                className="w-full  "
              />
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col gap-2">
            <p className="font-semibold " style={{ fontSize: 22 }}>
              ...
            </p>
            <p className="font-semibold text-lg">0,00$</p>
            <p className="text-[#333] py-2">...</p>

            <div className="flex gap-3 text-sm ">
              <p className="font-semibold">Stock: </p>
            </div>
            <div className="flex gap-3 text-sm ">
              <p className="font-semibold">Category: </p>
              <p className="capitalize text-[#333]"></p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Loading;
