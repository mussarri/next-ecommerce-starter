"use client";

import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Pagination from "../../pagination";

import AuthContext from "../../../../context/AuthContext";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const Users = ({ data }) => {
  const { error, deleteUser, clearErrors } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const deleteHandler = (id) => {
    deleteUser(id);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {data?.users?.length} Users
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>

            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.users?.map((user) => (
            <tr key={user?._id} className="bg-white">
              <td className="px-6 py-2">{user?.name}</td>
              <td className="px-6 py-2">{user?.email}</td>

              <td className="px-6 py-2">
                <div className="flex">
                  <Link
                    href={`/admin/users/${user?._id}`}
                    className="px-2 py-2 inline-block text-[#facc15] bg-white shadow-sm border border-[#ccc] rounded-md hover:bg-lightgray cursor-pointer mr-2"
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </Link>
                  <a
                    className="px-2 py-2 inline-block text-[#dc2626] bg-white shadow-sm border border-[#ccc] rounded-md hover:bg-lightgray cursor-pointer"
                    onClick={() => deleteHandler(user?._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.users?.length > data?.resPerPage && (
        <div className="mb-6">
          <Pagination
            resPerPage={data?.resPerPage}
            productsCount={data?.ordersCount}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
