"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";

import {
  faCartShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartContext from "../../../context/CartContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { data } = useSession();
  const [search, setSearch] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  useEffect(() => {
    if (data) {
      setUser(data?.user);
    }
  }, [data]);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const updateQuery = () => {
    search &&
      (pathname === "/products/"
        ? router.push(pathname + "?" + createQueryString("q", search))
        : router.push(pathname + "products?" + createQueryString("q", search)));
  };

  return (
    <header
      className="w-full h-[80px] flex  bg-white  border-b"
      style={{ zIndex: 1000, borderColor: "#ddd" }}
    >
      <div className="flex justify-between items-center max-width w-full p-2 px-5">
        <a
          href={"/"}
          className="logo font-semibold font-xl text-buttonhover"
          style={{ fontSize: "1.3rem" }}
        >
          E-commerce
        </a>
        <div className="hidden sm:flex">
          <input
            type="text"
            name="search"
            className="border h-10 p-2 px-3 border-[#ddd] text-sm"
            placeholder="Ara"
            style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                updateQuery();
              }
            }}
          />
          <a onClick={updateQuery}>
            <div
              className="border h-10 w-10  border-[#ddd] text-sm flex justify-center items-center"
              style={{
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderLeft: 0,
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </a>
        </div>
        <div className="flex gap-2 capitalize">
          <Link href={"/cart"} className="p-2 text-sm flex gap-1 items-center">
            <FontAwesomeIcon icon={faCartShopping} />
            Cart({cart?.cartItems?.length || 0})
          </Link>

          {!user && (
            <Link
              href={"/login"}
              className="p-2 text-sm bg-buttonhover text-white px-3 hover:shadow rounded "
            >
              Login
            </Link>
          )}
          {user && (
            <Link
              href={"/profile"}
              className="p-2 text-sm px-3 flex gap-1 items-center rounded-full bg-buttonhover text-white "
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
