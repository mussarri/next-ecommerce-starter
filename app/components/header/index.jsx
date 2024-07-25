import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header
      className="w-full h-[80px] flex  bg-white  border-b"
      style={{ zIndex: 1000, borderColor: "#ddd" }}
    >
      <div className="flex justify-between items-center max-width w-full p-2 px-5">
        <a href={"/"} className="logo font-semibold font-xl text-buttonhover"  style={{fontSize : '1.3rem'}}>
          E-commerce
        </a>
        <div className="flex gap-3 capitalize">
          <Link
            href={"/cart"}
            className="p-2 text-sm bg-indigo-500 rounded "
          >
            Cart
          </Link>
          <Link
            href={"/products"}
            className="p-2 text-sm bg-indigo-500 rounded "
          >
            Products
          </Link>
          <Link href={"/login"} className="p-2 text-sm bg-indigo-500 rounded ">
            Giris yap
          </Link>
          <Link
            href={"/register"}
            className="p-2 text-sm bg-indigo-500 rounded "
          >
            Kayit ol
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
