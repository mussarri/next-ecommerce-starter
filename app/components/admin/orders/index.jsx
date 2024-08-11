"use client";

import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Pagination from "../../pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import OrderContext from "../../../../context/OrderContext";
const Orders = ({ orders }) => {
  const { deleteOrder, error, clearErrors } = useContext(OrderContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const deleteHandler = (id) => {
    if (confirm("Are you sure ?")) {
      deleteOrder(id);
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {orders?.ordersCount} Orders
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Amount Paid
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.orders?.map((order) => (
            <tr className="bg-white">
              <td className="px-6 py-2">{order?._id}</td>
              <td className="px-6 py-2">${order?.paymentInfo?.amountPaid}</td>
              <td className="px-6 py-2">{order?.orderStatus}</td>
              <td className="px-6 py-2">
                <div className="flex">
                  <Link
                    href={`/admin/orders/${order?._id}`}
                    className="px-2 py-2 inline-block text-[#facc15] bg-white shadow-sm border border-[#ccc] rounded-md hover:bg-lightgray cursor-pointer mr-2"
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </Link>
                  <a
                    className="px-2 py-2 inline-block text-[#dc2626] bg-white shadow-sm border border-[#ccc] rounded-md hover:bg-lightgray cursor-pointer"
                    onClick={() => deleteHandler(order?._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-6">
        <Pagination
          resPerPage={orders?.resPerPage}
          productsCount={orders?.ordersCount}
        />
      </div>
    </div>
  );
};

export default Orders;
