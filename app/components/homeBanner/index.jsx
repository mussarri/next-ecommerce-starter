import Link from "next/link";
import React from "react";

const HomeBanner = () => {
  return (
    <div className="home-banner bg-[#edf1f3]  ">
      <div className="flex items-center max-width px-8 md:px-5   ">
        <div className="flex-1 ">
          <h1 className="uppercase" style={{ fontWeight: "lighter" }}>
            Your products are great.
          </h1>
          <Link href="/products">
            <button className="uppercase text-md sm:text-xl bg-button hover:bg-buttonhover  font-light p-2 sm:p-4 px-5 sm:px-10 mt-5 text-white">
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
