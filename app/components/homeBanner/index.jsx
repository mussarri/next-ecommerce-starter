import Link from "next/link";
import React from "react";

const HomeBanner = () => {
  return (
    <div className="bg-[#edf1f3]">
      <div className="flex items-center max-width p-2">
        <div className="flex-1 ">
          <h1
            className="uppercase"
            style={{ fontSize: "4.3rem", fontWeight: "lighter" }}
          >
            Your products are great.
          </h1>
          <Link href="/products">
            <button className="uppercase text-xl bg-button hover:bg-buttonhover  font-light p-4 px-10 mt-5 text-white">
              Shop Product
            </button>
          </Link>
        </div>
        <div className="flex-1">
          <img src="/banner-image.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
