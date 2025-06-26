"use client";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userAgent } from "next/server";
import React, { useContext, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import AuthContext from "../../../context/AuthContext";
import { styleText } from "util";
const Sidebar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const logoutHandler = async () => {
    signOut();
    setIsOpen(close);
  };

  const openClass = " absolute left-0 top-0 pt-10 bg-[#fff] w-screen h-screen ";
  const closeClass = " w-0 absolute -left-[100%] top-0  ";
  return (
    <>
      {isMobile && (
        <div
          className="p-4 pt-0 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
      )}
      <aside
        className={
          " md:w-1/3 lg:w-1/4 px-2 transition-all " +
          (!isMobile ? "" : isOpen ? openClass : closeClass)
        }
        style={{ zIndex: 20 }}
      >
        <ul className="sidebar">
          <>
            {isMobile && (
              <div className="flex px-3 justify-between mb-3">
                <h1 className="font-semibold text-xl">Menus</h1>
                <div
                  className=" cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <FontAwesomeIcon icon={faClose} />
                </div>
              </div>
            )}

            {user?.role === "admin" && (
              <>
                <li>
                  {" "}
                  <Link
                    href="/admin/addProduct"
                    onClick={() => setIsOpen(!isOpen)}
                    className="block px-3 py-2 text-[#333] hover:bg-blue-100 hover:text-blue-500 rounded-md"
                  >
                    New Product <span className="text-red-500">(Admin)</span>
                  </Link>
                </li>

                <li>
                  {" "}
                  <Link
                    href="/admin/products"
                    onClick={() => setIsOpen(!isOpen)}
                    className="block px-3 py-2 text-[#333] hover:bg-blue-100 hover:text-blue-500 rounded-md"
                  >
                    All Products <span className="text-red-500">(Admin)</span>
                  </Link>
                </li>

                <li>
                  {" "}
                  <Link
                    href="/admin/orders"
                    onClick={() => setIsOpen(!isOpen)}
                    className="block px-3 py-2 text-[#333] hover:bg-blue-100 hover:text-blue-500 rounded-md"
                  >
                    All Orders <span className="text-red-500">(Admin)</span>
                  </Link>
                </li>

                <li>
                  {" "}
                  <Link
                    href="/admin/users"
                    onClick={() => setIsOpen(!isOpen)}
                    className="block px-3 py-2 text-[#333] hover:bg-blue-100 hover:text-blue-500 rounded-md"
                  >
                    All Users <span className="text-red-500">(Admin)</span>
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    href="/admin/logs"
                    onClick={() => setIsOpen(!isOpen)}
                    className="block px-3 py-2 text-[#333] hover:bg-blue-100 hover:text-blue-500 rounded-md"
                  >
                    Logs <span className="text-red-500">(Admin)</span>
                  </Link>
                </li>
              </>
            )}
          </>

          <li>
            {" "}
            <Link
              href="/profile"
              onClick={() => setIsOpen(!isOpen)}
              className="block px-3 py-2 text-[#333] hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              Your Profile
            </Link>
          </li>
          <li>
            {" "}
            <Link
              href="/profile/orders"
              onClick={() => setIsOpen(!isOpen)}
              className="block px-3 py-2 text-[#333] hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              Orders
            </Link>
          </li>
          <li>
            {" "}
            <Link
              href="/profile/update"
              onClick={() => setIsOpen(!isOpen)}
              className="block px-3 py-2 text-[#333] hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              Update Profile
            </Link>
          </li>
          <li>
            {" "}
            <Link
              href="/profile/update_password"
              onClick={() => setIsOpen(!isOpen)}
              className="block px-3 py-2 text-[#333] hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              Update Password
            </Link>
          </li>

          <li>
            {" "}
            <a
              className="block px-3 py-2 text-error hover:bg-red-500 hover:text-white rounded-md cursor-pointer"
              onClick={logoutHandler}
            >
              Logout
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
