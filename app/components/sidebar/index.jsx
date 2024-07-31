"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userAgent } from "next/server";
import React from "react";

const Sidebar = () => {
  const logoutHandler = async () => {
    signOut();
  };

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-2">
      <ul className="sidebar">
        <>
          <li>
            {" "}
            <Link
              href="/admin/products/new"
              className="block px-3 py-2 text-[#333] hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              New Product <span className="text-red-500">(Admin)</span>
            </Link>
          </li>

          <li>
            {" "}
            <Link
              href="/admin/products"
              className="block px-3 py-2 text-[#333] hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              All Products <span className="text-red-500">(Admin)</span>
            </Link>
          </li>

          <li>
            {" "}
            <Link
              href="/admin/orders"
              className="block px-3 py-2 text-[#333] hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              All Orders <span className="text-red-500">(Admin)</span>
            </Link>
          </li>

          <li>
            {" "}
            <Link
              href="/admin/users"
              className="block px-3 py-2 text-[#333] hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              All Users <span className="text-red-500">(Admin)</span>
            </Link>
          </li>

          <hr />
        </>

        <li>
          {" "}
          <Link
            href="/profile"
            className="block px-3 py-2 text-[#333] hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Your Profile
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/profile/orders"
            className="block px-3 py-2 text-[#333] hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Orders
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/profile/update"
            className="block px-3 py-2 text-[#333] hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Update Profile
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/profile/update_password"
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
  );
};

export default Sidebar;
