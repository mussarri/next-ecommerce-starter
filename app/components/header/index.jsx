import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-full h-[60px] flex border-b border-gray-900 fixed">
      <div className="flex justify-between items-center max-width w-full">
        <Link href={"/"}>LOGO</Link>
        <div className="flex gap-3">
          <Link
            href={"/login"}
            className="p-2 text-sm bg-indigo-500 rounded text-white"
          >
            Giris yap
          </Link>
          <Link
            href={"/register"}
            className="p-2 text-sm bg-indigo-500 rounded text-white"
          >
            Kayit ol
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
