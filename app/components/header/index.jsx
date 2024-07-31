"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";

import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartContext from "../../../context/CartContext";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { data } = useSession();
   
  useEffect(() => {
    if (data) {
      setUser(data?.user);
    }
  }, [data]);
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
        <div className="flex gap-2 capitalize">
          <Link
            href={"/cart"}
            className="p-2 text-sm rounded flex gap-1 items-center"
          >
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
